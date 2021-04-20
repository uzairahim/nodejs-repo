import { Request, Response, NextFunction } from "express";
import Job from "../models/Job";
import HttpStatusCodes from "http-status-codes";
import mongoose from "mongoose";

const createJob = (req: Request, res: Response, next: NextFunction) => {
    let {
        workingDayId,
        title,
        description,
        date,
        dateInNumber,
        category,
        location,
        maxHeight,
        minHeight,
        weight,
        maxWeight,
        waist,
        maxWaist,
        neck,
        maxNeck,
        jacket,
        maxJacket,
        inseam,
        maxInseam,
        sleeve,
        maxSleeve,
        hair,
        eyes,
        age,
        maxAge,
        chest,
        maxChest,
        shoes,
        maxShoes,
        ethnicity,
        clothingOption,
        bodyRequirements,
        remarks,
        additionalInfo,
        createdBy,
        status,
        isActive,
        noOfPerformerRequired,
        dates,
        isSaveForLater
    } = req.body;

    const job = new Job({
        _id: new mongoose.Types.ObjectId(),
        workingDayId,
        title,
        description,
        date,
        dateInNumber,
        category,
        location,
        maxHeight,
        minHeight,
        weight,
        maxWeight,
        waist,
        maxWaist,
        neck,
        maxNeck,
        jacket,
        maxJacket,
        inseam,
        maxInseam,
        sleeve,
        maxSleeve,
        hair,
        eyes,
        age,
        maxAge,
        chest,
        maxChest,
        shoes,
        maxShoes,
        ethnicity,
        clothingOption,
        bodyRequirements,
        remarks,
        additionalInfo,
        createdBy,
        status,
        isActive,
        noOfPerformerRequired,
        dates,
        isSaveForLater
    });
    return job.save()
        .then(data => {
            return res.status(HttpStatusCodes.CREATED).json({
                data
            });
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

const allJobs = (req: Request, res: Response, next: NextFunction) => {

    Job.find()
        .then(data => {
            return res.status(HttpStatusCodes.OK).json(data);
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

export default { createJob, allJobs };
