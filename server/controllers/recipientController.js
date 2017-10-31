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
    db.recipients.a()
      .then(() => res.status(200).send())
      .catch(err => res.status(500).send(err));
  },


  editRecipient: function(req, res) {
    const db = req.app.get('db');
    db.recipients.a()
      .then(() => res.status(200).send())
      .catch(err => res.status(500).send(err));
  },


  deleteRecipient: function(req, res) {
    const db = req.app.get('db');
    db.recipients.a()
      .then(() => res.status(200).send())
      .catch(err => res.status(500).send(err));
  }
}