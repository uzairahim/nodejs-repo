import { Document } from "mongoose";
import IShowWorkingDay from "../interfaces/show_working_day";

/**
 * Interface to model the Show Schema for TypeScript.
 * @param workingDayId:string
 * @param title:string
 * @param order:string
 * @param dayTitle:string
 * @param date:string
 */
export default interface IShowWorkingDayTitle extends Document {
    workingDayId: IShowWorkingDay["_id"];
    title: string;
    order: string;
}