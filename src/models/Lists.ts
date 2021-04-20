import { Model, model, Schema } from "mongoose";
import IList from "../interfaces/lists";

const ListSchema: Schema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        userIds: {
            type: Array,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
    },
    {
        timestamps: true,
    }
);
ListSchema.index({ title: 'text' })

const List: Model<IList> = model("List", ListSchema);

export default List;
