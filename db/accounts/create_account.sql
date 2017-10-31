INSERT INTO accounts (first_name, last_name, auth_id)
VALUES ($1, $2, $3)
RETURNING *;