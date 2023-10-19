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
    },

    genHawkinToken: async function() {
        let hawkinTokenData = await fetch(('https://cloud.hawkindynamics.com/api/token'), {
            headers: {
                Authorization: 'Bearer ' + process.env.HAWKINS_REFRESH_TOKEN
            }
        })
        
        let hawkinTokenResponse = await hawkinTokenData.json();
        //console.log(hawkinTokenResponse);
        return hawkinTokenResponse.access_token; 
    }  
    
    /*
    fetch((' https://cloud.hawkindynamics.com/api/token'), { // add {accountId}/athletes to url
        headers: {
            Authorization: 'Bearer ' + process.env.HAWKINS_REFRESH_TOKEN
        }
    }) 
    .then(response => { 
        if (response.ok) { 
            return response.json();
        } else { 
            throw new Error('API request failed'); 
        } 
    }) 
    .then(data => {      
        console.log(data);
    }) 
    .catch(error => { 
        console.error(error);
    });
    */
}

