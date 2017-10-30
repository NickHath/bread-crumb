// setup Twilio
const Twilio = require('twilio');

// phone numbers
const twilioNumber = process.env.TWILIO_PHONE_NUMBER;
const personalNumber = process.env.PERSONAL_NUMBER;

// API credentials
const twilioSID = process.env.TWILIO_ACCOUNT_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;

const client = new Twilio(twilioSID, twilioAuthToken);

// controller methods
module.exports = {
  sendText: (req, res) => {
    const { body, to } = req.body;
    client.messages.create({ 
      body: body, 
      to: to, 
      from: twilioNumber 
    }).then(message => console.log(message));
  },

  
  receiveText: (req, res) => {
    console.log(req.body);
    const { From, Body } = req.body;
    res.send(`
      <Response>
        <Message>
          Hello ${From}. You said: ${Body}
        </Message>
      </Response>
    `);
  },


  verifyCallerID: (req, res) => {
    
  },


  // need to send array of user objects...
  listCallerIDs: (req, res) => {
    let callerIDs = [];
    client.outgoingCallerIds.list((err, data) => {
      data.forEach(callerID => {
        console.log(`User: ${callerID.friendlyName}\nPhone No: ${callerID.phoneNumber}\n`);
        // let currentCallerID = {};
        // currentCallerID[callerID.friendlyName] = callerID.phoneNumber;
        // callerIDs.push(currentCallerID);
      })
    });
    // res.status(200).send(JSON.stringify(callerIDs));
  }
}