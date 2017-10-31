module.exports = {
  getRecipients: function(req, res) {
    const db = req.app.get('db');
    db.recipients.get_recipients()
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
    const { first_name, last_name, phone, hunt_id } = req.body;
    db.recipients.create_recipient([first_name, last_name, phone, hunt_id])
      .then(() => res.status(200).send(`Created new recipient`))
      .catch(err => res.status(500).send(err));
  },


  editRecipient: function(req, res) {
    const db = req.app.get('db');
    const { first_name, last_name, phone } = req.body;
    db.recipients.edit_recipient([req.params.id, first_name, last_name, phone])
      .then(() => res.status(200).send(`Edited recipient ${req.params.id}`))
      .catch(err => res.status(500).send(err));
  },


  deleteRecipient: function(req, res) {
    const db = req.app.get('db');
    db.recipients.delete_recipient([req.params.id])
      .then(() => res.status(200).send(`Deleted recipient ${req.params.id}`))
      .catch(err => res.status(500).send(err));
  }
}