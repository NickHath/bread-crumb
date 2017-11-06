module.exports = {
  getTasks: function(req, res) {
    const db = req.app.get('db');
    db.tasks.get_tasks([req.params.hunt_id])
      .then(tasks => res.status(200).send(tasks))
      .catch(err => res.status(500).send(err));

  },


  getTask: function(req, res) {
    const db = req.app.get('db');
    db.tasks.get_task_by_id([req.params.id])
      .then(recipient => res.status(200).send(recipient))
      .catch(err => res.status(500).send(err));
  },


  createTask: function(req, res) {
    const db = req.app.get('db');
    let tasks = req.body;
    let count = 0;
    tasks.forEach(prompt => {
      const { task, hint, answer, hunt_id, task_order } = prompt;
      db.tasks.create_task([task, hint, answer, hunt_id, task_order])
              .then(() => {
                ++count;
                if (count === tasks.length) { res.status(200).send('Added tasks'); };
              });
    })
  },


  editTask: function(req, res) {
    const db = req.app.get('db');
    const { task, hint, answer } = req.body;
    db.tasks.edit_task([req.params.id, task, hint, answer])
      .then(() => res.status(200).send(`Edited task ${req.params.id}`))
      .catch(err => res.status(500).send(err));
  },


  deleteTask: function(req, res) {
    const db = req.app.get('db');
    db.tasks.delete_task([req.params.id])
      .then(() => res.status(200).send(`Deleted task ${req.params.id}`))
      .catch(err => res.status(500).send(err));
  }
}