import { Document } from "mongoose";
import IShow from "../interfaces/shows";
import IEpisode from "../interfaces/episodes";
import {IUser} from "./users";

/**
 * Interface to model the Show Schema for TypeScript.
 * @param showId:string
 * @param episodeId:string
 * @param title:string
 * @param dayTitle:string
 * @param date:string
 */
export default interface IShowTeamMember extends Document {
    showId: IShow["_id"];
    episodeId: IEpisode["_id"];
    createdBy: IUser["_id"];
    userId: string;
    userRole: string;
    status: string;
}