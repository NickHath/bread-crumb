UPDATE tasks
SET task = $2, hint = $3, answer = $4, task_order = $5
WHERE task_id = $1;