require('dotenv').config();
const express = require('express')
    , session = require('express-session')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , bodyParser = require('body-parser')
    , cors = require('cors');

const app = express();
app.use(bodyParser.json());
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

app.listen(process.env.SERVER_PORT, console.log(`I'm listening... port: ${process.env.SERVER_PORT}`));






















// ----------------  TWILIO  ----------------- //

// const Twilio = require('twilio');

// // phone numbers
// const twilioNumber = process.env.TWILIO_PHONE_NUMBER;
// const personalNumber = process.env.PERSONAL_NUMBER;

// // API credentials
// const twilioSID = process.env.TWILIO_ACCOUNT_SID;
// const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;

// const client = new Twilio(twilioSID, twilioAuthToken);

// list entire message history
// client.messages.list((err, data) => {
//   data.messages.forEach(message => console.log(message.body));
// });


// send a text!
// client.messages.create({
//   body: 'Test from Node.js server!',
//   to: '+17276564164',
//   from: twilioNumber
// }).then(message => console.log(message));

// -------------------------------------------- //
