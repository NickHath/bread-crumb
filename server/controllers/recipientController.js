module.exports = {
  getRecipients: function(req, res) {
    const db = req.app.get('db');
    db.QUERY()
      .then(() => res.status(200).send())
      .catch(err => res.status(500).send(err));

  },


  getRecipient: function(req, res) {
    const db = req.app.get('db');
    db.QUERY()
      .then(() => res.status(200).send())
      .catch(err => res.status(500).send(err));
  },


  createRecipient: function(req, res) {
    const db = req.app.get('db');
    db.QUERY()
      .then(() => res.status(200).send())
      .catch(err => res.status(500).send(err));
  },


  editRecipient: function(req, res) {
    const db = req.app.get('db');
    db.QUERY()
      .then(() => res.status(200).send())
      .catch(err => res.status(500).send(err));
  },


  deleteRecipient: function(req, res) {
    const db = req.app.get('db');
    db.QUERY()
      .then(() => res.status(200).send())
      .catch(err => res.status(500).send(err));
  }
}