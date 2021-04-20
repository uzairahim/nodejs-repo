const moment = require('moment');

export function customRoleResponse(data) {
    var roleObj = {
        'id': data.id,
        'name': data.name,
        'slug': data.slug,
        'description': data.description,
        'level': data.level,
        'date': moment(data.date).format("LLLL"),
    };

    return roleObj;
}

export function customRoleCollectionResponse(data) {
    var roles = [];
    var i;
    for (i = 0; i < data.length; i++) {
        roles.push(this.customRoleResponse(data[i]));
    }
    return roles;
}


