import { Model, model, Schema } from "mongoose";
import IShowInvitation from "../interfaces/show_invitation";

const ShowInvitationSchema: Schema = new Schema(
    {
        showId:{
            type: Schema.Types.ObjectId,
            ref: "Show"
        },
        email: {
            type: String,
            required: true
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

const ShowInvitation: Model<IShowInvitation> = model("ShowInvitation", ShowInvitationSchema);

export default ShowInvitation;
