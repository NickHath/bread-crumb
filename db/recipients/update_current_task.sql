UPDATE recipients
SET current_task = $3
WHERE phone = $1 AND hunt_id = $2;