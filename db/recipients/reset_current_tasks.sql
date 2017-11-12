UPDATE recipients
SET current_task = NULL
WHERE phone = $1;