'use strict';
require('dotenv').config({path:"./.env"}); 

module.exports = {
    //npm install jsonwebtoken
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
    },

    genHawkinToken: async function() {          // HAWKIN TOKEN
        let hawkinTokenData = await fetch(('https://cloud.hawkindynamics.com/api/token'), {
            headers: {
                Authorization: 'Bearer ' + process.env.HAWKINS_REFRESH_TOKEN
            }
        })
        
        let hawkinTokenResponse = await hawkinTokenData.json();
        return hawkinTokenResponse.access_token; 
    }  
}

