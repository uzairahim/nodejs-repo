const moment = require('moment');
export function customEpisodeResponse(data) {

    var episodeObj = {
        'id': data.id,
        'showId': data.showId,
        'episodeNo': data.episodeNo,
        'title': data.title,
        'date': moment(data.date).format("LLLL"),
    };

    return episodeObj;
}

export function customEpisodeCollectionResponse(data) {
    console.log(data);
    var episodes = [];
    var i;
    for (i = 0; i < data.length; i++) {
        episodes.push(this.customEpisodeResponse(data[i]));
    }
    return episodes;
}
