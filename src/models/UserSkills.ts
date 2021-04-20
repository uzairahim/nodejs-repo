import {Model, model, Schema} from "mongoose";
import {IUserSkill} from "../interfaces/user_skill";

const userSkillSchema: Schema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    skillCategoryId: {
        type: Schema.Types.ObjectId,
        ref: "SkillCategory"
    },
    skillLevel: {
        type: String,
    },
}, {
    timestamps: true,
});

const UserSkill: Model<IUserSkill> = model("UserSkill", userSkillSchema);

export default UserSkill;
