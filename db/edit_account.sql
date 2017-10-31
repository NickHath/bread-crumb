UPDATE accounts
SET first_name = $2, last_name = $3
WHERE account_id = $1;