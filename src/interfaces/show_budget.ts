import { Document } from "mongoose";
import IShow from "../interfaces/shows";

/**
 * Interface to model the Show Schema for TypeScript.
 * @param showId:string
 * @param budgetType:string
 * @param amount:string
 */
export default interface IShowBudget extends Document {
    showId: IShow["_id"];
    budgetType: string;
    amount: string;
}