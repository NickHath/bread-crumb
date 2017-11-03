async function buildScavHunt(hunts) {
  let scavHunts = hunts.map(hunt => {
    db.recipients.get_recipients([hunt.hunt_id])
      .then(recipients => hunt.recipients = recipients)
      .then(() => {
        db.tasks.get_tasks([hunt.hunt_id])
          .then(tasks => {
            hunt.tasks = tasks;
            console.log('IN BUILDSCAVHUNT', scavHunts);
            scavHunts.push(hunt);
          })
      })
      return hunt;
  })
  return scavHunts;
}