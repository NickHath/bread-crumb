UPDATE recipients
SET first_name = $2, last_name = $3, phone = $4
WHERE recipient_id = $1;