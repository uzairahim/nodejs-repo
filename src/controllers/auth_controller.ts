import { Request, Response, NextFunction } from "express";
import HttpStatusCodes from "http-status-codes";
import User from "../models/User";
import bcrypt from "bcryptjs";
import { IUser } from "../../src/interfaces/users";
import Payload from "Payload";
import jwt from "jsonwebtoken";
import config from "config";
import { successResponse } from "../api-response";
import { customUserResponse } from "../custom/user-response";
import errors from "../constants/error_messages";
import UserProfile from "../models/UserProfile";
import {IUserProfile} from "../interfaces/user_profile";
const Joi = require('joi');
import { lowerCase, localeLowerCase } from "lower-case";


const register = async (req: Request, res: Response, next: NextFunction) => {

    const { firstName, lastName, phoneNo, country, address, aboutUs, email, password, role } = req.body;

    try {

        const schema = Joi.object({
            email: Joi.string().required(),
            password: Joi.string().min(6).required(),
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            role: Joi.string().required()
        });
        const { error } = schema.validate(req.body, {
            allowUnknown: true
        });

        if (error) {
            return res.status(HttpStatusCodes.BAD_REQUEST).send({
                // `${error.details.map(x => x.message).join(', ')}`
                message: error.details.map(x => x.context.label) + errors.messages.IS_REQUIRED
            });
        } else {

            let userEmail = lowerCase(email);

            let user: IUser = await User.findOne({ "email" : userEmail });
            if (user) {
                return res.status(HttpStatusCodes.BAD_REQUEST).json({
                    message: errors.messages.USER_EXIST
                });
            }
            // const options: gravatar.Options = {
            //     s: "200",
            //     r: "pg",
            //     d: "mm"
            // };
            // const avatar = gravatar.url(email, options);

            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(password, salt);

            // Build user object based on IUser
            const userFields = {
                firstName,
                lastName,
                phoneNo,
                country,
                address,
                aboutUs,
                email: userEmail,
                password: hashed,
                role
            };

            user = new User(userFields);
            return user.save()
                .then(async data => {
                    const payload: Payload = {
                        userId: user.id
                    };

                    const userProfiles = new UserProfile({
                        userId: user.id
                    });
                    await userProfiles.save();

                    let result: IUser = await User.findById(user.id).populate('role');
                    const userProfile = await UserProfile.findOne({"userId": user._id});

                    jwt.sign(
                        payload,
                        config.get("jwtSecret"),
                        { expiresIn: config.get("jwtExpiration") },
                        (err, token) => {
                            if (err) throw err;
                            result['token'] = token;
                            result["userProfile"] = userProfile;
                            return res.json(successResponse(customUserResponse(result)));
                        }
                    );
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

const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    try {

        const schema = Joi.object({
            email: Joi.string().required(),
            password: Joi.string().min(6).required()
        });
        const { error } = schema.validate(req.body, { allowUnknown: true });

        if (error) {
            return res.status(HttpStatusCodes.BAD_REQUEST).json({
                message: error.details.map(x => x.context.label) + errors.messages.IS_REQUIRED
            });
        } else {
            let userEmail = lowerCase(email);

            let user: IUser = await User.findOne({ "email" : userEmail }).populate('role');
            if (!user) {
                return res.status(HttpStatusCodes.BAD_REQUEST).json({
                    message: errors.messages.USER_NOT_FOUND
                });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(HttpStatusCodes.BAD_REQUEST).json({
                    message: errors.messages.INVALID_CREDENTIALS
                });
            }

            const payload: Payload = {
                userId: user.id
            };

            const userProfile = await UserProfile.findOne({"userId": user._id});

            jwt.sign(
                payload,
                config.get("jwtSecret"),
                { expiresIn: config.get("jwtExpiration") },
                (err, token) => {
                    if (err) throw err;
                    user["token"] = token;
                    user["userProfile"] = userProfile;
                    res.json(successResponse(customUserResponse(user)));
                }
            );
        }
    } catch (err) {
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
    }
};

const userDetail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user: IUser = await User.findById(req["userId"]).select("-password").populate("role");
        const userProfile = await UserProfile.findOne({"userId": req["userId"]});
        user["userProfile"] = userProfile;
        return user ? res.json(successResponse(customUserResponse(user))) :
            res.status(HttpStatusCodes.BAD_REQUEST).json({ message: errors.messages.USER_NOT_FOUND });

    } catch (err) {
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
    }
};

export default { register, login, userDetail }