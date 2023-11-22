
//import * as jose from 'jose'

const FIRSTBEAT_SHARED_SECRET = "10776568-52c4-4c08-a9eb-a6122d0358f2";
const FIRSTBEAT_CONSUMERID = "0f074fe3-7b6c-4d3f-9ac3-dc1d68f347f9"; 
const HAWKINS_REFRESH_TOKEN = "72pWdB.YimpQ0nX6uN8jGZT37nri2uT8OWQB";

//npm install jsonwebtoken

export function genToken() {                    // FIRSTBEAT TOKEN
        // const SECRET = FIRSTBEAT_SHARED_SECRET;
        // const issuedAt = Date.now() / 1000;
        // const payload = {
        // iss: FIRSTBEAT_CONSUMERID,
        // iat: issuedAt,
        // exp: issuedAt + 300
        // };

        // // default algorithm (HMAC SHA256)

        // const token = jose.sign(payload, SECRET); 
        // return token;
    }
export async function genHawkinToken() {          // HAWKIN TOKEN
        let hawkinTokenData = await fetch(('https://cloud.hawkindynamics.com/api/token'), {
            headers: {
                Authorization: 'Bearer ' + HAWKINS_REFRESH_TOKEN
            }
        })
        
        let hawkinTokenResponse = await hawkinTokenData.json();
        return hawkinTokenResponse.access_token; 
    }  