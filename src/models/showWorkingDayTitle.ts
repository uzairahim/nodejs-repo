import { Model, model, Schema } from "mongoose";
import IShowWorkingDayTitle from "../interfaces/show_working_day_title";

const ShowWorkingDayTitleSchema: Schema = new Schema(
    {
        workingDayId:{
            type: Schema.Types.ObjectId,
            ref: "ShowWorkingDay"
        },
        title:{
            type: String,
            required: true
        },
        order: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
    }
);

const ShowWorkingDayTitle: Model<IShowWorkingDayTitle> = model("ShowWorkingDayTitle", ShowWorkingDayTitleSchema);

export default ShowWorkingDayTitle;
