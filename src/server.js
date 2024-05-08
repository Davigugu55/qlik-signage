require('dotenv').config();
const express = require("express");
const app = express();
const fs = require("fs");
const https = require('https');
const config = require("../config/config");
const token = require("../token/token");
const favicon = require('serve-favicon');
const path = require('path');
const { v4: uuidv4 } = require("uuid");

app.use(express.static(__dirname));

// Serve your favicon - adjust the path as necessary
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));

app.get("/mashup", (req, res) => {
  let mashFile = fs.readFileSync("./src/index.html", "utf8");
  res.write(mashFile);
  res.end();
});

app.get("/fullscreen", (req, res) => {
  let mashFile = fs.readFileSync("./src/fullscreen.html", "utf8");
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

app.get("/theme/:name", (req, res) => {
  let themeFile = fs.readFileSync(`./themes/${req.params.name}.json`);
  res.json({ theme: JSON.parse(themeFile) });
  res.end();
});

// SSL server options
const options = {
  key: fs.readFileSync('.data/server.key'),
  cert: fs.readFileSync('.data/server.cert')
};

// Creating HTTPS server
https.createServer(options, app).listen(8080, () => {
  console.log('HTTPS Server running on port 8080');
});
