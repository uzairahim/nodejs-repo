import {Model, model, Schema} from "mongoose";
import { ISkillCategory } from "../interfaces/skill_category";

const skillCategorySchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    parentId: {
        type: Number
    },
    date: {
        type: Date,
        default: Date.now
    },
}, {
    timestamps: true,
});

const SkillCategory: Model<ISkillCategory> = model("SkillCategory", skillCategorySchema);

export default SkillCategory;
