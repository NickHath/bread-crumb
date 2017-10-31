require('dotenv').config();
const express = require('express')
    , massive = require('massive')
    , session = require('express-session')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , bodyParser = require('body-parser')
    , cors = require('cors');

const app = express();

// set up postgres DB
massive(process.env.CONNECTION_STRING).then(db => app.set('db', db));

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());


// set up express-session
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

passport.deserializeUser((profile, done) => {
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


// require controllers
const accountController = require('./controllers/accountController');
const scavHuntController = require('./controllers/scavHuntController');
const recipientController = require('./controllers/recipientController');
const taskController = require('./controllers/taskController');

// each controller can...
// get all, get, create, edit, delete

// accountController -- wait to test Auth0 before writitng these endpoints
app.get('/account/:id', accountController.getAccount);
app.get('/accounts', accountController.getAccounts);
app.put('/account/edit/:id', accountController.editAccount);
app.delete('/account/delete/:id', accountController.deleteAccount);

// scavHuntController
app.get('/scav/hunts', scavHuntController.getHunts);
app.get('/scav/hunt/:id', scavHuntController.getHunt);
app.post('/scav/create', scavHuntController.createHunt);
app.put('/scav/edit/:id', scavHuntController.editHunt);
app.delete('/scav/delete/:id', scavHuntController.deleteHunt);

// recipientController
app.get('/recipients', recipientController.getRecipients);
app.get('/recipient/:id', recipientController.getRecipient);
app.post('/recipient/create', recipientController.createRecipient);
app.put('/recipient/edit/:id', recipientController.editRecipient);
app.delete('/recipient/delete/:id', recipientController.deleteRecipient);

// taskHuntController
app.get('/tasks', taskController.getTasks);
app.get('/task/:id', taskController.getTask);
app.post('/task/create', taskController.createTask);
app.put('/task/edit/:id', taskController.editTask);
app.delete('/task/delete/:id', taskController.deleteTask);



// ----------------  TWILIO  ----------------- //

const textingController = require('./controllers/textingController');

// listen for texts at /message and handle replies 
// i.e receive message body and reply with either
// 1. next clue, or 2. 'Try again'

// listens for texts... req.body needs a Body and a To (their var names)
app.post('/message', textingController.receiveText);

// receives a 'body' and 'to' in the req.body, sends text
// {'body':'hi','to':'1231321'}
app.post('/send', textingController.sendText);

// given a phone number and name, verify the number and set its friendlyName
app.post('/addcallerid', textingController.verifyCallerID);

// list all outgoing Caller IDs
app.get('/callerids', textingController.listCallerIDs);


// -------------------------------------------- //

app.listen(process.env.SERVER_PORT, console.log(`I'm listening... port: ${process.env.SERVER_PORT}`));
