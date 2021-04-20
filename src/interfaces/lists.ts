import { Document } from "mongoose";

/**
 * Interface to model the Show Schema for TypeScript.
 * @param title:string
 * @param userIds:string
 * @param createdBy:string
 */
export default interface IList extends Document {
    title: string;
    userIds: string;
    createdBy: string;
}