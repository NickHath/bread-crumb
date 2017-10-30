require('dotenv').config();
const Twilio = require('twilio');

// phone numbers
const twilioNumber = process.env.TWILIO_PHONE_NUMBER;
const personalNumber = process.env.PERSONAL_NUMBER;

// API credentials
const twilioSID = process.env.TWILIO_ACCOUNT_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;

const client = new Twilio(twilioSID, twilioAuthToken);

// list entire message history
client.messages.list((err, data) => {
  data.messages.forEach(message => console.log(message.body));
});


// send a text!
// client.messages.create({
//   body: 'Test from Node.js server!',
//   to: '+17276564164',
//   from: twilioNumber
// }).then(message => console.log(message));