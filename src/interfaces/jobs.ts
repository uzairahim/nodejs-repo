import { Document } from "mongoose";

/**
 * Interface to model the Show Schema for TypeScript.
    * @param title:string
    * @param id: string
    * @param    workingDayId: string
    * @param    title: string
    * @param    description: string
    * @param    date: string
    * @param    dateInNumber: number
    * @param     category: string
    * @param     location: string
    * @param     maxHeight: string
    * @param     minHeight: string
    * @param     weight: string
    * @param     maxWeight: string
    * @param     waist: string
    * @param     maxWaist: string
    * @param     neck: string
    * @param     maxNeck: string
    * @param     jacket: string
    * @param     maxJacket: string
    * @param     inseam: string
    * @param     maxInseam: string
    * @param     sleeve: string
    * @param     maxSleeve: string
    * @param     hair: string
    * @param     eyes: string
    * @param     age: string
    * @param     maxAge: string
    * @param     chest: string
    * @param     maxChest: string
    * @param     shoes: string
    * @param     maxShoes: string
    * @param     ethnicity: string
    * @param     clothingOption: string
    * @param     bodyRequirements: string
    * @param     remarks: string
    * @param     additionalInfo: string
    * @param     createdBy: string
    * @param     status: string
    * @param     isActive: boolean
    * @param     noOfPerformerRequired: number
    * @param     dates: string
    * @param     isSaveFor_later: boolean
 */
export default interface IShow extends Document {
    workingDayId: string;
    title: string;
    description: string;
    date: string;
    dateInNumber: number;
    category: string;
    location: string;
    maxHeight: string;
    minHeight: string;
    weight: string;
    maxWeight: string;
    waist: string;
    maxWaist: string;
    neck: string;
    maxNeck: string;
    jacket: string;
    maxJacket: string;
    inseam: string;
    maxInseam: string;
    sleeve: string;
    maxSleeve: string;
    hair: string;
    eyes: string;
    age: string;
    maxAge: string;
    chest: string;
    maxChest: string;
    shoes: string;
    maxShoes: string;
    ethnicity: string;
    clothingOption: string;
    bodyRequirements: string;
    remarks: string;
    additionalInfo: string;
    createdBy: string;
    status: string;
    isActive: boolean;
    noOfPerformerRequired: number;
    dates: string;
    isSaveForLater: boolean;
}