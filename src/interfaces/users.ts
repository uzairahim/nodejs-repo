import { Document } from "mongoose";
import { IRole } from "../interfaces/roles";

/**
 * Interface to model the User Schema for TypeScript.
 * @param email:string
 * @param password:string
 * @param avatar:string
 * @param name:string
 */
export interface IUser extends Document {
    name: string;
    firstName: string;
    lastName: string;
    phoneNo: string;
    email: string;
    address: string;
    password: string;
    aboutUs: string;
    profilePicUrl: string;
    resumeUrl: string;
    isProfilePublic: boolean;
    experience: string;
    accountReason: string;
    roleId: IRole["_id"];
    unionNo: string;
    country: string;
    isCompleted: boolean;
    date: string;
}