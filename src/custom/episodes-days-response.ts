const moment = require('moment');
export function customEpisodeDaysResponse(data) {

    var episodeDaysObj = {
        'id': data.id,
        'showId': data.showId,
        'episodeId': data.episodeId,
        'title': data.title,
        'dateNo': data.dateNo,
        'date': moment(data.date).format("LLLL"),
    };

    return episodeDaysObj;
}

export function customEpisodeDaysCollectionResponse(data) {
    console.log(data);
    var episodesDays = [];
    var i;
    for (i = 0; i < data.length; i++) {
        episodesDays.push(this.customEpisodeDaysResponse(data[i]));
    }
    return episodesDays;
}
