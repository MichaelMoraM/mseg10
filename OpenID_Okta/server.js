"use strict";

const express = require("express");
const session = require("express-session");
const ExpressOIDC = require("@okta/oidc-middleware").ExpressOIDC;
var cons = require('consolidate');
var path = require('path');
let app = express();

//variables nuevas del chat/socket
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

// Globals
const OKTA_ISSUER_URI = "https://ucenfotec-acmmoram.okta.com"
const OKTA_CLIENT_ID = "0oa2squcnwVgUgKKq356";
const OKTA_CLIENT_SECRET = "G72ATs0MpaNBXqIyd8XATA-sS2A8FkK-ygyTwJ0m";
const REDIRECT_URI = "http://localhost:3000/authorization-code/callback";
const PORT = process.env.PORT || "3000";
const SECRET = "kajshdkajshdkjahsdkjahsdkjahskjdhaksjhdkajhsdkajhsdkjsd";

// App settings
// app.set("view engine", "pug");
// view engine setup
app.engine('html', cons.swig)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// App middleware
app.use("/static", express.static("static"));

app.use(session({
  cookie: { httpOnly: true },
  secret: SECRET
}));

let oidc = new ExpressOIDC({
  issuer: OKTA_ISSUER_URI,
  client_id: OKTA_CLIENT_ID,
  client_secret: OKTA_CLIENT_SECRET,
  redirect_uri: REDIRECT_URI,
  routes: { callback: { defaultRedirect: "/chat" } },
  scope: 'openid profile'
});

// App routes
app.use(oidc.router);

app.get("/", (req, res) => {
  res.render("index");
});

/*app.get("/dashboard", oidc.ensureAuthenticated(), (req, res) => {
  res.render("dashboard", { user: req.userinfo });
});*/

app.get("/chat", oidc.ensureAuthenticated(), (req, res) => {
  res.render("chat", { user: req.userinfo });
});

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

const openIdClient = require('openid-client');
openIdClient.Issuer.defaultHttpOptions.timeout = 20000;

oidc.on("ready", () => {
  console.log("Server running on port: " + PORT);
  app.listen(parseInt(PORT));
});

oidc.on("error", err => {
  console.error(err);
});

/*------------------------------------------------*/

// root: presentar html
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
        io.emit('chat message', msg);
  });
});
/*
http.listen(port, function(){
  console.log('listening on *:' + port);
});*/
