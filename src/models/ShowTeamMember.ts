import { Model, model, Schema } from "mongoose";
import IShowTeamMember from "../interfaces/show_team_member";

const ShowTeamMemberSchema: Schema = new Schema(
    {
        episodeId:{
            type: Schema.Types.ObjectId,
            ref: "Episode"
        },
        showId:{
            type: Schema.Types.ObjectId,
            ref: "Show"
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        userId: {
            type: String,
            required: true,
        },
        userRole: {
            type: String,
        },
        status: {
            type: String,
            default: "default",
        },
    },
    {
        timestamps: true,
    }
);

const ShowTeamMember: Model<IShowTeamMember> = model("ShowTeamMember", ShowTeamMemberSchema);

export default ShowTeamMember;
