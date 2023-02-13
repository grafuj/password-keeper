-- Drop and recreate Widgets table (Example)

DROP TABLE IF EXISTS passwords CASCADE;
CREATE TABLE passwords (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  url VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL

);
