import { Model, model, Schema } from "mongoose";
import IShowBudget from "../interfaces/show_budget";

const ShowBudgetSchema: Schema = new Schema(
    {
        showId:{
            type: Schema.Types.ObjectId,
            ref: "Show"
        },
        budgetType: {
            type: String,
            required: true,
        },
        amount: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

const ShowBudget: Model<IShowBudget> = model("ShowBudget", ShowBudgetSchema);

export default ShowBudget;
