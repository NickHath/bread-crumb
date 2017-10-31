CREATE TABLE accounts (
  account_id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(40),
  last_name VARCHAR(40)
);

CREATE TABLE scavenger_hunts (
  hunt_id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(40),
  description VARCHAR(1000),
  account_id INTEGER,
  FOREIGN KEY(account_id) REFERENCES accounts(account_id)
);

CREATE TABLE recipients (
  recipient_id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(40),
  last_name VARCHAR(40),
  phone VARCHAR(20),
  hunt_id INTEGER,
  FOREIGN KEY(hunt_id) REFERENCES scavenger_hunts(hunt_id)
);

CREATE TABLE tasks (
  task_id SERIAL PRIMARY KEY NOT NULL,
  task VARCHAR(255),
  hint VARCHAR(255),
  answer VARCHAR(255),
  hunt_id INTEGER,
  FOREIGN KEY(hunt_id) REFERENCES scavenger_hunts(hunt_id)
);