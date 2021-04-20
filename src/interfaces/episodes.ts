import { Document } from "mongoose";
import IShow from "../interfaces/shows";

/**
 * Interface to model the Show Schema for TypeScript.
 * @param showId:string
 * @param episodeNo:string
 * @param title:string
 * @param date:string
 * @param createdBy:string
 */
export default interface IEpisode extends Document {
    showId: IShow["_id"];
    episodeNo: string;
    title: string;
    date: string;
    createdBy: string;
}