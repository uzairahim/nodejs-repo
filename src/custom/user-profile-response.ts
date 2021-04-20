const moment = require('moment');
import {customUserResponse} from "../custom/user-response"

export function customUserProfileResponse(data) {

    var userObj = {
        'id': data.id,
        'user':  customUserResponse(data.user),
        'gender': data.gender,
        'dateOfBirth': data.date_of_birth,
        'height': data.height,
        'weight': data.weight,
        'hair': data.hair,
        'eye_color': data.eye_color,
        'date' : moment(data.date).format("LLLL"),
    };

    return userObj;
}

