import { Document } from "mongoose";

/**
 * Interface to model the Show Schema for TypeScript.
 * @param title:string
 * @param remarks:string
 * @param additionalInfo:string
 * @param showType:string
 * @param createdBy:string
 * @param createdUser:string
 */
export default interface IShow extends Document {
    title: string;
    remarks: string;
    additionalInfo: string;
    showType: string;
    createdBy: string;
    createdUser: string;
    date: string;
}