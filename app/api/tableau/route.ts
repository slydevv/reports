var jwt = require('jsonwebtoken');
import { NextResponse } from 'next/server'
const { v4: uuidv4 } = require("uuid");
const {randomBytes} = require("crypto");


export function GET() {
  
  const response = NextResponse.next()
  // const uuid = uuidv4();
   const timenow = new Date().getTime();
   const expiry = new Date().getTime() + 3 * 60 * 1000;
  
    const token = jwt.sign(
      {
        iss: process.env.TABLEAU_CLIENTID,
        sub: "support@eha.ng",
        aud: "tableau",
        // iat: timenow,
        // exp: expiry,
        jti: randomBytes(64).toString("hex"),
        scp: ["tableau:views:embed", "tableau:metrics:embed"]
      },
      process.env.TABLEAU_SECRETVALUE,
      {
        algorithm: "HS256",
        expiresIn: 600, 
        header: {
          kid: process.env.TABLEAU_SECRETID,
          iss: process.env.TABLEAU_CLIENTID,  
        },
      }
    );
   
 
 
 return NextResponse.json(token);
  };


