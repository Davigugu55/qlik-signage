//const jsonWebToken = require("jsonwebtoken");
const fs = require("fs");
const config = require("../config/config");
const { v4: uuidv4 } = require("uuid");
const key = fs.readFileSync(".data/private.key.txt", "utf8");
const methods = {
  generate: function (sub, name, email, groups = []) {
    // kid and issuer have to match with the IDP config and the audience has to be qlik.api/jwt-login-session
const { Auth } = require('@qlik/sdk');

    const claims = {
      jti: uuidv4(),
      keyid: config.keyid,
      algorithm: "RS256",
      issuer: config.issuer,
      expiresIn: "30s",
      notBefore: '0s',
      audience: "qlik.api/login/jwt-session",
      sub: sub,
      subType: "user",
      name: name,
      email: email,
      email_verified: true,
      groups: groups
    };

    const token = Auth.generateSignedToken(claims, key);
    return token;
  }
};

module.exports = methods;