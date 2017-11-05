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
    let { body, to, from } = req.body;
    // let user = req.user.given_name ? req.user.given_name : from;
    body = `TEMP NAME has created a scavenger hunt for you. Your first task: ${body}.`;
    client.messages.create({ 
      body: body, 
      to: to, 
      from: twilioNumber 
    }).then(message => {
      console.log(message)
      res.status(200).send(`Sent message "${body}" to ${to}`);
      })
      .catch(err => res.status(500).send(err));
  },

  
  receiveText: (req, res) => {
    console.log(req.body);
    const { From, Body } = req.body;
    const db = req.app.get('db');
    db.recipients.get_recipient_by_phone([From])
      .then(recipient => {
        
      });
    res.send(`
      <Response>
        <Message>
          Hello ${From}. You said: "${Body}"
        </Message>
      </Response>
    `);
  },


  addCallerID: (req, res) => {
    const { phone, name } = req.body;
    // calls them, console logs code they need
    client.validationRequests.create({
      friendlyName: name,
      phoneNumber: phone
    }).then(data => console.log(data.validationCode));
  },


  // need to send array of user objects...
  listCallerIDs: (req, res) => {
    let callerIDs = [];
    client.outgoingCallerIds.list((err, data) => {
      data.forEach(callerID => {
        let currentCallerID = {};
        currentCallerID[callerID.friendlyName] = callerID.phoneNumber;
        callerIDs.push(currentCallerID);
      })
    }).then(()=> res.status(200).send(JSON.stringify(callerIDs)))
      .catch(err => res.status(500).send(err));
  }
}