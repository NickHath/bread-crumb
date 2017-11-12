SELECT current_task 
FROM recipients
WHERE phone = $1 AND hunt_id = $2;