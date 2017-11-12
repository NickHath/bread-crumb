SELECT *
FROM recipients
WHERE phone = $1 AND hunt_id = $2 AND current_task IS NULL;