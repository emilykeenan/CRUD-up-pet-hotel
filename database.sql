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
<<<<<<< HEAD

-- 3. Joining Owner and Pet
-- SELECT * FROM owners
-- JOIN pets ON owners.id = pets.owner_id;
--
-- 4.
-- CREATE TABLE visits (
-- 	id SERIAL PRIMARY KEY,
-- 	check_in date,
-- 	check_out date,
-- 	pet_id int REFERENCES pets
-- );
=======
>>>>>>> master
