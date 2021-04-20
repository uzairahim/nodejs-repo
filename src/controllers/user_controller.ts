import {Request, Response, NextFunction} from "express";
import HttpStatusCodes from "http-status-codes";
import User from "../models/User";
import List from "../models/Lists";
import mongoose from "mongoose";
import UserSkills from "../models/UserSkills";
import errors from "../constants/error_messages";
import auth from "../middleware/auth";
import UserProfile from "../models/UserProfile";
import {successResponse} from "../api-response";
import {customUserResponse} from "../custom/user-response";
import {IUser} from "../interfaces/users";

const Joi = require('joi');

const uploadFile = async (req: Request, res: Response, next: NextFunction) => {
    let imageName = req['files'];
    let resumeName = req['files'];
    if(resumeName[0].mimetype === 'application/pdf'){
        var resumeFile = req['files'][0].filename;
    }
    if(imageName[0].mimetype === 'image/jpeg' || imageName[0].mimetype === 'image/png'){
        var imageFile = req['files'][0].filename;
    }
    let userExist = await User.findById(req['userId']);
    User.findByIdAndUpdate(req['userId'], {
        $set:
            {
                "profilePicUrl": imageFile ? imageFile : userExist.profilePicUrl,
                "resumeUrl": resumeFile ? resumeFile : userExist.resumeUrl,
            }
    },{returnOriginal: false} ).then(data => {
        return res.status(HttpStatusCodes.OK).json(successResponse(customUserResponse(data)));
    })
        .catch(err => {
            return res.status(HttpStatusCodes.BAD_REQUEST).json({
                errors: [
                    {
                        message: err.message,
                    },
                ],
            });
        });
};

const userSkills = (req: Request, res: Response, next: NextFunction) => {
    let {
        skillCategoryId,
        skillLevel
    } = req.body;

    const userSkill = new UserSkills({
        _id: new mongoose.Types.ObjectId(),
        "userId": req['userId'],
        skillCategoryId,
        skillLevel
    });
    return userSkill.save()
        .then(data => {
            return res.status(HttpStatusCodes.CREATED).json(data);
        })
        .catch(err => {
            return res.status(HttpStatusCodes.BAD_REQUEST).json({
                errors: [
                    {
                        message: err.message,
                    },
                ],
            });
        });
};

const searchByName = (req: Request, res: Response, next: NextFunction) => {
    let {
        name
    } = req.body;

    return User.find({$text: {$search: name}})
        .then(data => {
            return res.status(HttpStatusCodes.OK).json(data);
        }).catch(err => {
            return res.status(HttpStatusCodes.BAD_REQUEST).json({
                message: err.message
            });
        });
};

const createList = async (req: Request, res: Response, next: NextFunction) => {
    const {title, userIds} = req.body;
    try {

        const schema = Joi.object({
            title: Joi.string().required(),
            userIds: Joi.string().required()
        });
        const {error} = schema.validate(req.body, {allowUnknown: true});

        if (error) {
            return res.status(HttpStatusCodes.BAD_REQUEST).json({
                message: error.details.map(x => x.context.label) + errors.messages.IS_REQUIRED
            });
        } else {
            const listFields = {
                title,
                userIds,
                "createdBy": req['userId']
            };

            let list = new List(listFields);
            return list.save()
                .then(async data => {
                    return res.json(data);
                })
                .catch(err => {
                    return res.status(HttpStatusCodes.BAD_REQUEST).json({
                        message: err.message
                    });
                });
        }
    } catch (err) {
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
    }
};
const getList = async (req: Request, res: Response, next: NextFunction) => {

    List.find({"createdBy": req['userId']})
        .then(async data => {
            return res.json(data);
        })
        .catch(err => {
            return res.status(HttpStatusCodes.BAD_REQUEST).json({
                message: err.message
            });
        });
}

const updateProfile = async (req: Request, res: Response, next: NextFunction) => {

    try {

        //User
        let name = req.body.name;
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
        let phoneNo = req.body.phoneNo;
        let aboutUs = req.body.aboutUs;
        let isProfilePublic = req.body.isProfilePublic;
        let country = req.body.country;
        let isCompleted = req.body.isCompleted;
        let experience = req.body.experience;
        let accountReason = req.body.accountReason;
        let unionNo = req.body.unionNo;

        // Profile
        let gender = req.body.bgPerformer.gender;
        let dateOfBirth = req.body.bgPerformer.dateOfBirth;
        let height = req.body.bgPerformer.height;
        let weight = req.body.bgPerformer.weight;
        let hair = req.body.bgPerformer.hair;
        let eyeColor = req.body.bgPerformer.eyeColor;
        let neck = req.body.bgPerformer.neck;
        let inseam = req.body.bgPerformer.inseam;
        let sleeve = req.body.bgPerformer.sleeve;
        let waist = req.body.bgPerformer.waist;
        let shoe = req.body.bgPerformer.shoe;
        let chest = req.body.bgPerformer.chest;
        let jacket = req.body.bgPerformer.jacket;
        let documents = req.body.bgPerformer.documents;

        let userData = await User.findByIdAndUpdate(req["userId"], {
            $set:
                {
                    "name": name,
                    "firstName": firstName,
                    "lastName": lastName,
                    "phoneNo": phoneNo,
                    "aboutUs": aboutUs,
                    "isProfilePublic": isProfilePublic,
                    "country": country,
                    "isCompleted": isCompleted,
                    "experience": experience,
                    "accountReason": accountReason,
                    "unionNo": unionNo,
                }
        }, {returnOriginal: false})

        let BGPerformer = await UserProfile.findOneAndUpdate({"userId": req["userId"]}, {
            $set:
                {
                    "gender": gender,
                    "dateOfBirth": dateOfBirth,
                    "height": height,
                    "weight": weight,
                    "hair": hair,
                    "eyeColor": eyeColor,
                    "neck": neck,
                    "inseam": inseam,
                    "sleeve": sleeve,
                    "waist": waist,
                    "shoe": shoe,
                    "chest": chest,
                    "jacket": jacket,
                    "documents": documents,
                }
        }, {returnOriginal: false});

        let user = await User.findById(req["userId"]).populate("role");
        user["userProfile"] = BGPerformer;
        return res.status(HttpStatusCodes.OK).json(successResponse(customUserResponse(user)));
    } catch (err) {
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
    }
}


export default {uploadFile, updateProfile, userSkills, searchByName, createList, getList};
