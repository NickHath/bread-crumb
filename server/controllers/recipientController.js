module.exports = {
  getRecipients: function(req, res) {
    const db = req.app.get('db');
    db.recipients.get_recipients([req.params.hunt_id])
      .then(recipients => res.status(200).send(recipients))
      .catch(err => res.status(500).send(err));
  },


  getRecipient: function(req, res) {
    const db = req.app.get('db');
    db.recipients.get_recipient_by_id([req.params.id])
      .then(recipient => res.status(200).send(recipient))
      .catch(err => res.status(500).send(err));
  },


  createRecipient: function(req, res) {
    const db = req.app.get('db');
    let recipients = req.body;
    let count = 0;
    recipients.forEach(recipient => {
      const { first_name, last_name, phone, hunt_id } = recipient;  
      db.recipients.create_recipient([first_name, last_name, phone, hunt_id])
                   .then(() => {
                      ++count;
                      if (count === recipients.length) { res.status(200).send('Added recipients'); };
                   })
    })
  },


  updateCurrentTask: function(req, res) {
    const db = req.app.get('db');
    const { phone, next_task } = req.body;
    db.recipients.update_current_task([phone, req.params.hunt_id, next_task])
      .then(() => res.status(200).send('Updated current task'))
      .catch(err => res.status(500).send(err))
  },

  updateRecipients: function(req, res) {
    const db = req.app.get('db');
    let recipients = req.body;
    recipients.forEach(recipient => {
      const { recipient_id, first_name, last_name, phone } = recipient;      
      db.recipients.edit_recipient([recipient_id, first_name, last_name, phone])
    })
      res.status(200).send();
  },


  deleteRecipient: function(req, res) {
    const db = req.app.get('db');
    db.recipients.delete_recipient([req.params.hunt_id])
      .then(() => res.status(200).send(`Deleted recipient ${req.params.hunt_id}`))
      .catch(err => res.status(500).send(err));
  },

  deleteRecipientById: function(req, res) {
    const db = req.app.get('db');
    db.recipients.delete_recipient_by_id([req.params.id])
      .then(() => res.status(200).send(`Deleted recipient ${req.params.id}`))
      .catch(err => res.status(500).send(err));
  }
}