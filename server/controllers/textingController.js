// setup Twilio
const Twilio = require('twilio');
const checkGuess = require('../checkGuess');

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
    const { first_name, last_name } = req.user;
    let user = `${first_name[0].toUpperCase() + first_name.slice(1)} ${last_name[0].toUpperCase() + last_name.slice(1)}` || from || 'Someone';
    body = `${user} has created a scavenger hunt for you. Your first task: ${body}.`;
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
    // check if recipient exists (phone and hunt_id)
    // then get all tasks with that hunt_id and index it at current_task
    db.recipients.get_recipient_by_phone([From])
      .then(recipients => {
        recipients.forEach(recipient => {
          if (recipient.current_task !== null) {
            db.tasks.get_tasks([recipient.hunt_id])
              .then(tasks => {
                tasks.sort((a, b) => a.task_order - b.task_order);
                if (checkGuess.exactMatch(Body, tasks[recipient.current_task].answer)) {
                  db.recipients.update_current_task([From, recipient.hunt_id, ++recipient.current_task])
                    .then(() => {
                      if (recipient.current_task === tasks.length) {
                        res.send(`
                          <Response>
                            <Message>
                              Congratulations. You win! Should have some custom text here.
                            </Message>
                          </Response>
                        `)
                      }
                      res.send(`
                        <Response>
                         <Message>
                           Correct. Your next task: ${tasks[recipient.current_task].task}
                          </Message>
                        </Response>
                      `)
                    })
                } else if (checkGuess.closeMatch(Body, tasks[recipient.current_task].answer)) {
                  res.send(`
                    <Response>
                      <Message>
                        ${ checkGuess.matchingWords(Body, tasks[recipient.current_task].answer) }
                      </Message>
                    </Response>
                  `)
                } else if (Body.toLowerCase().replace(/\s/g, '') === 'hint') {
                  res.send(`
                    <Response>
                      <Message>
                        Your hint is: ${tasks[recipient.current_task].hint}
                      </Message>
                    </Response>
                  `)
                } else {
                  res.send(`
                    <Response>
                      <Message>
                        Sorry, try again.
                      </Message>
                    </Response>
                  `)
                }
              });
          }
        })
      });
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