import { Document } from "mongoose";
import IShow from "../interfaces/shows";

/**
 * Interface to model the Show Schema for TypeScript.
 * @param showId:string
 * @param email:string
 * @param status:string
 */
export default interface IShowInvitation extends Document {
    showId: IShow["_id"];
    email: string;
    status: string;
}