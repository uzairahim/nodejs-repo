import { Model, model, Schema } from "mongoose";
import IShow from "../interfaces/shows";

const ShowSchema: Schema = new Schema(
    {

        title: {
            type: String,
            required: true,
        },
        remarks: {
            type: String,
        },
        additionalInfo: {
            type: String,
        },
        showType: {
            type: String,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        createdUser: {
            type: String,
        },
        date: {
            type: Date,
        }
    },
    {
        timestamps: true,
    }
);
ShowSchema.index({ title: 'text' })

const Show: Model<IShow> = model("Show", ShowSchema);

export default Show;
