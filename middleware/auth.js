const { request } = require('express');
const jwt = require('jsonwebtoken');

module.exports = (request, response, next) => {
    const token = request?.headers?.authorization?.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    if(request.body.username && decodedToken.mailId !== request.body.username){
        throw "Invalid UserID"
    }else {
        request.email = decodedToken.mailId
        next();
    }

}