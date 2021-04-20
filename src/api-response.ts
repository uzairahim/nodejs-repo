export function successResponse (data) {

    var response = {
        'message': "success",
        'code':  200,
        'data': data
    };

    return response;
}

export function errorResponse (data) {

    var response = {
        'message': "error",
        'code':  404,
        'data': data
    };

    return response;
}

export function authErrorResponse (data) {

    var response = {
        'message': "unauthorized",
        'code':  401,
        'data': data
    };

    return response;
}

export function entityResponse (data) {

    var response = {
        'message': "Fields Required",
        'code':  422,
        'data': data
    };

    return response;
}