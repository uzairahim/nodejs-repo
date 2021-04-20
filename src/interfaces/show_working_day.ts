import { Document } from "mongoose";
import IShow from "../interfaces/shows";
import IEpisode from "../interfaces/episodes";

/**
 * Interface to model the Show Schema for TypeScript.
 * @param showId:string
 * @param episodeId:string
 * @param title:string
 * @param dayTitle:string
 * @param date:string
 */
export default interface IShowWorkingDay extends Document {
    showId: IShow["_id"];
    episodeId: IEpisode["_id"];
    title: string;
    dayTitle: string;
    date: string;
}