import { Model, model, Schema } from "mongoose";
import IShowWorkingDay from "../interfaces/show_working_day";

const ShowWorkingDaySchema: Schema = new Schema(
    {
        episodeId:{
            type: Schema.Types.ObjectId,
            ref: "Episode"
        },
        showId:{
            type: Schema.Types.ObjectId,
            ref: "Show"
        },
        title: {
            type: String,
            required: true,
        },
        dateNo: {
            type: String,
        },
        date: {
            type: Date,
            default: Date.now
        },
    },
    {
        timestamps: true,
    }
);

const ShowWorkingDay: Model<IShowWorkingDay> = model("ShowWorkingDay", ShowWorkingDaySchema);

export default ShowWorkingDay;
