import {Model, model, Schema} from "mongoose";
import {IUserProfile} from "../interfaces/user_profile";

const userProfileSchema: Schema = new Schema({
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        gender: {
            type: String,
        },
        dateOfBirth: {
            type: String,
        },
        height: {
            type: String,
        },
        weight: {
            type: String,
        },
        hair: {
            type: String,
        },
        eyeColor: {
            type: String,
        },
        neck: {
            type: String,
        },
        inseam: {
            type: String,
        },
        sleeve: {
            type: String,
        },
        waist: {
            type: String,
        },
        shoe: {
            type: String,
        },
        chest: {
            type: String,
        },
        jacket: {
            type: String,
        },
        documents: {
            type: String
        },
        date: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true,
    });

const UserProfile: Model<IUserProfile> = model("UserProfile", userProfileSchema);

export default UserProfile;
