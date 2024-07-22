-- Dummy table --
DROP TABLE IF EXISTS dummy;
CREATE TABLE dummy(created TIMESTAMP WITH TIME ZONE);

-- Your database schema goes here --
-- USER IS A KEYWORD SO IT MUST BE DOUBLE QUTED TO ESCAPE IT
-- doing SELECT * FROM user will just give you the current users using the database
-- very different from SELECT * FROM "user" which will acctually query your table
DROP TABLE IF EXISTS "user" cascade;
DROP TABLE IF EXISTS listing cascade;
DROP TABLE IF EXISTS category cascade;

CREATE TABLE "user"(id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), email VARCHAR(50) UNIQUE, phonenumber VARCHAR(20) UNIQUE, firstname VARCHAR(20), lastname VARCHAR(20), hash VARCHAR(60));

CREATE TABLE category(category VARCHAR(32) PRIMARY KEY, subcategories VARCHAR(32)[]);

CREATE TABLE listing(id SERIAL PRIMARY KEY, price REAL, title VARCHAR(100), description VARCHAR(10000), category VARCHAR(32), subcategory VARCHAR(32), specificAttribute VARCHAR(32), brand VARCHAR(32), latitude NUMERIC(8, 6), longitude NUMERIC(9, 6), userId UUID, ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP, images VARCHAR(30000)[], FOREIGN KEY(category) REFERENCES category(category), FOREIGN KEY(userId) REFERENCES "user"(id));

--CREATE TABLE "user"(
--    id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), 
--    email VARCHAR(50) UNIQUE, 
--    phonenumber VARCHAR(20) UNIQUE, 
--    firstname VARCHAR(20), 
--   lastname VARCHAR(20), 
--    hash VARCHAR(60));

--CREATE TABLE category(
--    category VARCHAR(32) PRIMARY KEY, 
--    subcategories VARCHAR(32)[]);

--CREATE TABLE listing(
--    id SERIAL PRIMARY KEY, 
--    price REAL, 
--    title VARCHAR(32), 
--    description VARCHAR(1000), 
--    category VARCHAR(32), 
--    subcategory VARCHAR(32), 
--    latitude NUMERIC(8, 6), 
--    longitude NUMERIC(9, 6), 
--    userId UUID, 
--    ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
--    images VARCHAR(512)[], 
--    FOREIGN KEY(category) REFERENCES category(category), 
--    FOREIGN KEY(userId) REFERENCES "user"(id));

-- CREATE TABLE response(
--     id SERIAL,
--     ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     userId UUID,
--     message VARCHAR(256),
--     FOREIGN KEY(userId) REFERENCES "user"(id)
--     FOREIGN KEY(id) REFERENCES listing(id),
-- );