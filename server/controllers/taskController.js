module.exports = {
  getTasks: function(req, res) {
    const db = req.app.get('db');
    db.QUERY()
      .then(() => res.status(200).send())
      .catch(err => res.status(500).send(err));

  },


  getTask: function(req, res) {
    const db = req.app.get('db');
    db.QUERY()
      .then(() => res.status(200).send())
      .catch(err => res.status(500).send(err));
  },


  createTask: function(req, res) {
    const db = req.app.get('db');
    db.QUERY()
      .then(() => res.status(200).send())
      .catch(err => res.status(500).send(err));
  },


  editTask: function(req, res) {
    const db = req.app.get('db');
    db.QUERY()
      .then(() => res.status(200).send())
      .catch(err => res.status(500).send(err));
  },


  deleteTask: function(req, res) {
    const db = req.app.get('db');
    db.QUERY()
      .then(() => res.status(200).send())
      .catch(err => res.status(500).send(err));
  }
}