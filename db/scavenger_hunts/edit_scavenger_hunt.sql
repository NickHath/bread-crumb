UPDATE scavenger_hunts
SET title = $2, description = $3
WHERE hunt_id = $1;