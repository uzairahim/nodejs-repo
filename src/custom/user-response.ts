const moment = require('moment');
import urls from "../constants/url";

export function customUserResponse(data) {

    var userObj = {
        'id': data.id,
        'name': data.name,
        'firstName': data.firstName,
        'lastName': data.lastName,
        'phoneNo': data.phoneNo,
        'email': data.email,
        'address': data.address,
        'aboutUs': data.aboutUs,
        'profilePicUrl': urls.values.imageLiveUrl + data.profilePicUrl,
        'resumeUrl':  urls.values.resumeLiveUrl + data.resumeUrl,
        'isProfilePublic': data.isProfilePublic,
        'experience': data.experience,
        'accountReason': data.accountReason,
        'unionNo': data.unionNo,
        'country': data.country,
        'role': data.role.name,
        'isCompleted': data.isCompleted,
        'bgPerformer': data.userProfile,
        'date': moment(data.date).format("LLLL"),
        'token': data.token,
    };

    return userObj;
}

