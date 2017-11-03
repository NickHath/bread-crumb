module.exports = {
  getHunts: function(req, res) {
    let scavHunts = [], count = 0;
    const db = req.app.get('db');
    if (!req.user) { res.status(200).send([]); };
    db.scavenger_hunts.get_scavenger_hunt_by_account_id([req.user.account_id])
      .then( hunts => {
        hunts.forEach((hunt, index) => {
          db.recipients.get_recipients([hunt.hunt_id])
            .then(recipients => {
              hunt.recipients = recipients
              db.tasks.get_tasks([hunt.hunt_id])
                .then(tasks => {
                  hunt.tasks = tasks;
                  scavHunts.push(hunt);
                  count++;
                })
                .then(() => {
                  scavHunts.sort((a, b) => a.hunt_id - b.hunt_id); 
                  if (count === hunts.length) { res.status(200).send(scavHunts) }
                })
              })

        })
      })
      .catch(err => res.status(500).send(err))
  },


  getHunt: function(req, res) {
    const db = req.app.get('db');
    db.scavenger_hunts.get_scavenger_hunt_by_id([req.params.id])
      .then(hunt => res.status(200).send(hunt))
      .catch(err => res.status(500).send(err));
  },


  createHunt: function(req, res) {
    const db = req.app.get('db');
    const { title, description, account_id } = req.body;
    db.scavenger_hunts.create_scavenger_hunt([title, description, account_id])
      .then(hunt => res.status(200).send(hunt))
      .catch(err => res.status(500).send(err));
  },


  editHunt: function(req, res) {
    const db = req.app.get('db');
    const { title, description } = req.body;
    db.scavenger_hunts.edit_scavenger_hunt([req.params.id, title, description])
      .then(() => res.status(200).send(`Edited scavenger hunt ${req.params.id}`))
      .catch(err => res.status(500).send(err));
  },


  deleteHunt: function(req, res) {
    const db = req.app.get('db');
    db.scavenger_hunts.delete_scavenger_hunt([req.params.id])
      .then(() => res.status(200).send(`Deleted scavenger hunt ${req.params.id}`))
      .catch(err => res.status(500).send(err));
  }
}