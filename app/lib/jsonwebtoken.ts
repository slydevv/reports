var jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const generateTableauToken = () => {
  const uuid = uuidv4();
  const timenow = new Date().getTime();
  const expiry = new Date().getTime() + 8 * 60 * 1000; // Token expires after 8 minutes

  const token = jwt.sign(
    {
      iss: process.env.TABLEAU_CLIENTID,
      sub: "support@eha.ng",
      aud: "tableau",
      exp: expiry / 1000,
      iat: timenow / 1000,
      jti: uuid,
      scp: ["tableau:views:embed", "tableau:metrics:embed"],
    },
    process.env.TABLEAU_SECRETVALUE,
    {
      algorithm: "HS256",
      header: {
        kid: process.env.TABLEAU_SECRETID,
        iss: process.env.TABLEAU_CLIENTID,
      },
    }
  );

  return token;
};

export default generateTableauToken;