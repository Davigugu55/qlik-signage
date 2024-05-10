
const jsonWebToken = require("jsonwebtoken");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const path = require('path');


// const key = fs.readFileSync(".data/privatekey.pem", "utf8");
const key = fs.readFileSync(path.join(__dirname, '..', '.data', 'privatekey.pem'), "utf8");

const methods = {
  generate: function (sub, name, email, groups = []) {
    const signingOptions = {
      keyid: process.env.KEYID, // Accessing environment variable
      algorithm: "RS256",
      issuer: process.env.ISSUER, // Accessing environment variable
      expiresIn: "30s",
      notBefore: "1s",
      audience: "qlik.api/login/jwt-session"
    };

    const payload = {
      jti: uuidv4(),
      sub: sub,
      subType: "user",
      name: name,
      email: email,
      email_verified: true,
      groups: groups
    };

    const token = jsonWebToken.sign(payload, key, signingOptions);
    return token;
  }
};

module.exports = methods;
