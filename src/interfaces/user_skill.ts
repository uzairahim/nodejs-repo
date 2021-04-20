import { Document } from "mongoose";

/**
 * Interface to model the SkillCategory Schema for TypeScript.
 * @param userId:string
 * @param skillCategoryId:string
 * @param skillLevel:string
 */
export interface IUserSkill extends Document {
    userId: string;
    skillCategoryId: string;
    skillLevel: string;
}
