'use strict';
import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken'
// import { sign, decode, verify } from 'jsonwebtoken'


dotenv.config()

//npm install jsonwebtoken

export function genToken() {                    // FIRSTBEAT TOKEN
        const jwts = jwt;
        const SECRET = process.env.FIRSTBEAT_SHARED_SECRET;
        const issuedAt = Date.now() / 1000;
        const payload = {
        iss: process.env.FIRSTBEAT_CONSUMERID,
        iat: issuedAt,
        exp: issuedAt + 300
        };

        // default algorithm (HMAC SHA256)

        const token = jwts.sign(payload, SECRET); 
        return token;
    }
