
// libraries
var express = require("express");
var app = require('express')();
var session = require("express-session");
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var ExpressOIDC = require("@okta/oidc-middleware").ExpressOIDC;

app.use("/public", express.static("public"));

// OKTA -------------
const OKTA_ISSUER_URI = "https://ucenfotec-ac.okta.com"
const OKTA_CLIENT_ID = "0oa2romh2cDmdLTaU356";
const OKTA_CLIENT_SECRET = "rPJ4obTndhpHUmocoyNTOTqe3xA0WHbHTaLMegmt";
const REDIRECT_URI = "http://localhost:3000/authorization-code/callback";
const PORT = process.env.PORT || "3000";
const SECRET = "kajshdkajshdkjahsdkjahsdkjahskjdhaksjhdkajhsdkajhsdkjsd";

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

app.use(oidc.router);

// OKTA -------------

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/chat-room', oidc.ensureAuthenticated(), function(req, res){
   res.sendFile(__dirname + '/chat.html');
});

// chat room is okta protected
app.get('/chat', oidc.ensureAuthenticated(), function(req, res){
  friendly_name = req.userContext.userinfo.name;
  res.redirect('/chat-room?name='+friendly_name);
});

// Chat Sockets
io.on('connection', function(socket){
  // Lisyent to "Evento-Mensaje-Server"
  socket.on('Evento-Mensaje-Server', function(msg){
    // broadcast message
    io.emit('Evento-Mensaje-Server', msg);
  });
});

const openIdClient = require('openid-client');
openIdClient.Issuer.defaultHttpOptions.timeout = 20000;

// oidc event
oidc.on("ready", () => {

  http.listen(port, function(){
    console.log('listening on *:' + port);
  });

  oidc.on("error", err => {
    console.error(err);
  });

});
