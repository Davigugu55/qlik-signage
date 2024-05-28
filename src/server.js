require('dotenv').config();
const express = require("express");
const app = express();
const fs = require("fs");
const https = require('https');
const config = require("../config/config");
const token = require("../token/token");
const { v4: uuidv4 } = require("uuid");

app.use(express.static(__dirname));

app.get("/teste", (req, res) => {
  let mashFile = fs.readFileSync("./src/test.html", "utf8");
  res.write(mashFile);
  res.end();
});

app.get("/config", (req, res) => {
  res.json(config);
  res.end();
});

app.get("/token", (req, res) => {
  const uuid = uuidv4();
  const sub = `${process.env.USERSTUB}_${uuid}`;
  const email = process.env.USERSTUB;
  const name = process.env.USERDISPLAYNAME;
  const groups = [process.env.GROUP];
  
  const genT = token.generate(sub, name, email, groups);
  res.json({ token: genT });
});

// SSL server options
const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/signage.rumoon.com.br/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/signage.rumoon.com.br/fullchain.pem')
};

// Creating HTTPS server
https.createServer(options, app).listen(8080, '0.0.0.0', () => {
  console.log('HTTPS Server running on port 8080');
});
