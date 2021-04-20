import { Model, model, Schema } from "mongoose";
import IJob from "../interfaces/jobs";

const JobSchema: Schema = new Schema(
    {
        workingDayId: {
            type: Schema.Types.ObjectId,
            ref: "ShowWorkingDay",
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        date: {
            type: String,
        },
        dateInNumber: {
            type: Number,
        },
        category: {
            type: String,
        },
        location: {
            type: String,
        },
        maxHeight: {
            type: String,
        },
        minHeight: {
            type: String,
        },
        weight: {
            type: String,
        },
        maxWeight: {
            type: String,
        },
        waist: {
            type: String,
        },
        maxWaist: {
            type: String,
        },
        neck: {
            type: String,
        },
        maxNeck: {
            type: String,
        },
        jacket: {
            type: String,
        },
        maxJacket: {
            type: String,
        },
        inseam: {
            type: String,
        },
        maxInseam: {
            type: String,
        },
        sleeve: {
            type: String,
        },
        maxSleeve: {
            type: String,
        },
        hair: {
            type: String,
        },
        eyes: {
            type: String,
        },
        age: {
            type: String,
        },
        maxAge: {
            type: String,
        },
        chest: {
            type: String,
        },
        maxChest: {
            type: String,
        },
        shoes: {
            type: String,
        },
        maxShoes: {
            type: String,
        },
        ethnicity: {
            type: String,
        },
        clothingOption: {
            type: String,
        },
        bodyRequirements: {
            type: String,
        },
        remarks: {
            type: String,
        },
        additionalInfo: {
            type: String,
        },
        createdBy: {
            type: String,
        },
        status: {
            type: String,
        },
        isActive: {
            type: Boolean,
        },
        noOfPerformerRequired: {
            type: Number,
        },
        isSaveForLater: {
            type: String,
        },

    },
    {
        timestamps: true,
    }
);

const Job: Model<IJob> = model("Job", JobSchema);

export default Job;
