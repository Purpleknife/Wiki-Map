DROP TABLE IF EXISTS pins CASCADE;

CREATE TABLE pins (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image VARCHAR(255) NOT NULL,
  latitude REAL NOT NULL,
  longitude REAL NOT NULL,
  map_id INTEGER REFERENCES maps(id) ON DELETE CASCADE
);
