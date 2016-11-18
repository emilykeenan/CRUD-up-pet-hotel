CREATE TABLE owners (
id SERIAL PRIMARY KEY,
first_name VARCHAR(80) NOT NULL,
last_name VARCHAR(80) NOT NULL
);

CREATE TABLE pets (
id SERIAL PRIMARY KEY,
name VARCHAR(80) NOT NULL,
breed VARCHAR(80) NOT NULL,
color VARCHAR(80) NOT NULL,
owner_id INTEGER REFERENCES owners
);

CREATE TABLE visits (
id SERIAL PRIMARY KEY,
check_in DATE,
check_out DATE,
pet_id INTEGER REFERENCES pets
);
