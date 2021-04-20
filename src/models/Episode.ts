import { Model, model, Schema } from "mongoose";
import IEpisode from "../interfaces/episodes";

const EpisodeSchema: Schema = new Schema(
    {
        showId: {
            type: Schema.Types.ObjectId,
            ref: "Show"
        },

        episodeNo: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            default: Date.now
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true,
    }
);

const Episodes: Model<IEpisode> = model("Episode", EpisodeSchema);

export default Episodes;
