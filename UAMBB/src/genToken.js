'use strict';
require('dotenv').config({path:"./.env"}); 

//npm install jsonwebtoken
module.exports = {
    genFbToken: function() {                    // FIRSTBEAT TOKEN
        const jwt = require('jsonwebtoken');
        const SECRET = process.env.FIRSTBEAT_SHARED_SECRET;
        const issuedAt = Date.now() / 1000;
        const payload = {
        iss: process.env.FIRSTBEAT_CONSUMERID,
        iat: issuedAt,
        exp: issuedAt + 300
        };

        // default algorithm (HMAC SHA256)

        const token = jwt.sign(payload, SECRET); 
        return token;
    }
}