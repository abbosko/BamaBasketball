
//import jwt from 'jsonwebtoken'
import {SignJWT} from 'jose'


const FIRSTBEAT_SHARED_SECRET = "10776568-52c4-4c08-a9eb-a6122d0358f2";
const FIRSTBEAT_CONSUMERID = "0f074fe3-7b6c-4d3f-9ac3-dc1d68f347f9"; 
const HAWKINS_REFRESH_TOKEN = "72pWdB.YimpQ0nX6uN8jGZT37nri2uT8OWQB";

async function makeTok (secret, payload) {
    var issuedAt = Date.now() / 1000;
    var exp = issuedAt + 300;
    var tok = await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" , typ: "JWT"})
        .sign(secret);
return tok;
};



export async function genToken() {                    // FIRSTBEAT TOKEN
    const issuedAt = Date.now() / 1000;
    var payload = {
    iss: FIRSTBEAT_CONSUMERID,
    iat: issuedAt,
    exp: issuedAt + 300
    };

//     // json web token 
//     // default algorithm (HMAC SHA256)
    // const token = jwt.sign(payload, SECRET); 
    // return token;
    
    //jose


    const secret = new TextEncoder().encode(FIRSTBEAT_SHARED_SECRET);
    var token = await makeTok(secret, payload);
  
    return token;

  }


//         // default algorithm (HMAC SHA256)

//         // const token = jwt_sign(payload, SECRET); 
//         // return token;
//    // }
export async function genHawkinToken() {          // HAWKIN TOKEN
        let hawkinTokenData = await fetch(('https://corsproxy.io/?' + 'https://cloud.hawkindynamics.com/api/token'), {
            headers: {
                Authorization: 'Bearer ' + HAWKINS_REFRESH_TOKEN,
                'Access-Control-Allow-Origin': '*'
            }
        })
        
        let hawkinTokenResponse = await hawkinTokenData.json();
        return hawkinTokenResponse.access_token; 
    }  