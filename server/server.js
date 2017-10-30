require('dotenv').config();
const express = require('express')
    , session = require('express-session')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , bodyParser = require('body-parser')
    , cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new Auth0Strategy({
  domain: process.env.AUTH_DOMAIN,
  clientID: process.env.AUTH_CLIENT_ID,
  clientSecret: process.env.AUTH_CLIENT_SECRET,
  callbackURL: process.env.AUTH_CALLBACK
}, (accessToken, refreshToken, extraParams, profile, done) => {
     done(null, profile);
}));

passport.serializeUser((profile, done) => {
  done(null, profile);
});

passport.deserializeUser((id, done) => {
  done(null, profile);
});

app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', {
  successRedirect: 'http://localhost:3000/dashboard',
  failureRedirect: '/auth'
}));
app.get('/auth/me', (req, res) => {
  if (req.user) {
    return res.status(200).send(req.user);
  } else {
    return res.status(401).send('Please login.');
  }
});
app.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('http://localhost:3000/');
})

// ----------------  TWILIO  ----------------- //

const textingController = require('./controllers/textingController');

// listen for texts at /message and handle replies 
// i.e receive message body and reply with either
// 1. next clue, or 2. 'Try again'

// Need to send messages and listen for received messages using the same
// bodyparser...????
// NOT USING FRIENDLY NAME!!!!!!

// listens for texts... req.body needs a Body and a To (their vars)
app.post('/message', textingController.receiveText);

// receives a body and to in the req.body, sends text
app.post('/send', textingController.sendText);

// given a phone number and name, verify the number and set its friendlyName

// list all outgoing Caller IDs
app.get('/callerids', textingController.listCallerIDs);


// -------------------------------------------- //

app.listen(process.env.SERVER_PORT, console.log(`I'm listening... port: ${process.env.SERVER_PORT}`));
