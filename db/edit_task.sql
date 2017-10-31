UPDATE tasks
SET task = $2, hint = $3, answer = $4
WHERE task_id = $1;