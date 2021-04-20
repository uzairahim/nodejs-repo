import { Model, model, Schema } from "mongoose";
import { IRole } from "../interfaces/roles";
import enums from '../constants/default';
import error from '../constants/error_messages';

// var enu = { values: enums.values.ROLE_ENUMS, message: error.messages.INVALID_ROLE_ID }


const roleSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String
    },
    description: {
        type: String
    },
    level: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
});

const Role: Model<IRole> = model("Role", roleSchema);
export default Role;


