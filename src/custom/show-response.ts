const moment = require('moment');
import {customEpisodeCollectionResponse} from "../custom/episodes-response";

export function customShowResponse(data) {

    console.log(data.episodes);

    var showObj = {
        'id': data.id,
        'title': data.title,
        'remarks': data.remarks,
        'additionalInfo': data.additionalInfo,
        'showType': data.showType,
        'createdBy': data.createdBy,
        'createdUser': data.createdUser,
        'date': moment(data.date).format("LLLL"),
        'episodes': customEpisodeCollectionResponse(data.episodes)
    };

    return showObj;
}

