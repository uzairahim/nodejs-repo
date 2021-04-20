import { Document } from "mongoose";

/**
 * Interface to model the SkillCategory Schema for TypeScript.
 * @param name:string
 * @param parentId:integer
 */
export interface ISkillCategory extends Document {
    name: string;
    parentId: string;
}
