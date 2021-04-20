import { Document } from "mongoose";

/**
 * Interface to model the Role Schema for TypeScript.
 * @param name:string
 * @param slug:string
 * @param description:string
 * @param level:string
 * @param date:date
 */
export interface IRole extends Document {
    name: string;
    slug: string;
    description: string;
    level: string;
    date: string;
}
