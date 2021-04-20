import { Document } from "mongoose";
import {IUser} from "../interfaces/users";

/**
 * Interface to model the UserProfile Schema for TypeScript.
 * @param user:ref => User._id
 * @param gender:string
 * @param date_of_birth:string
 * @param height:string
 * @param weight:string
 * @param hair:string
 * @param eye_color:string
 */
export interface IUserProfile extends Document {
    user: IUser["_id"];
    gender: string;
    dateOfBirth: string;
    height: string;
    weight: string;
    hair: string;
    eyeColor: string;
    neck: string;
    inseam: string;
    sleeve: string;
    waist: string;
    shoe: string;
    chest: string;
    jacket: string;
    documents: string;
}
