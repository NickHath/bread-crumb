module.exports = {
  getHunts: function(req, res) {
    const db = req.app.get('db');
    db.scavenger_hunts.get_scavenger_hunts()
      .then(hunts => res.status(200).send(hunts))
      .catch(err => res.status(500).send(err));
  },


  getHunt: function(req, res) {
    const db = req.app.get('db');
    db.QUERY()
      .then(() => res.status(200).send())
      .catch(err => res.status(500).send(err));
  },


  createHunt: function(req, res) {
    const db = req.app.get('db');
    db.QUERY()
      .then(() => res.status(200).send())
      .catch(err => res.status(500).send(err));
  },


  editHunt: function(req, res) {
    const db = req.app.get('db');
    db.QUERY()
      .then(() => res.status(200).send())
      .catch(err => res.status(500).send(err));
  },


  deleteHunt: function(req, res) {
    const db = req.app.get('db');
    db.QUERY()
      .then(() => res.status(200).send())
      .catch(err => res.status(500).send(err));
  }
}