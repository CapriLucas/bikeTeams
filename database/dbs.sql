USE biketeams;

-- USERS TABLE
CREATE TABLE user(
  id UNSIGNED MEDIUMINT(10) NOT NULL,
  username VARCHAR(25) NOT NULL,
  password VARCHAR(60) NOT NULL,
  fullname VARCHAR(100) NOT NULL,
  birth_date DATE NOT NULL,
  team_id UNSIGNED MEDIUMINT(10)
)

ALTER TABLE user
  ADD PRIMARY KEY (id);

ALTER TABLE users
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE users;

-- TEAM TABLE
CREATE TABLE team (
  id UNSIGNED MEDIUMINT(10) NOT NULL,
  teamname VARCHAR(10) NOT NULL
  );

ALTER TABLE team
  ADD PRIMARY KEY(id);

ALTER TABLE team
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE team;

-- TOUR TABLE
CREATE TABLE tour(
  id UNSIGNED MEDIUMINT(10) NOT NULL,
  rel_id UNSIGNED MEDIUMINT(10) NOT NULL,
  is_team BOOLEAN NOT NULL,
  distance DOUBLE(4,3) NOT NULL,
  duration UNSIGNED MEDIUMINT(10),
  date DATE NOT NULL
);

ALTER TABLE tour
  ADD PRIMARY KEY(id);

ALTER TABLE tour
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE tour;

-- BIKE TABLE
CREATE TABLE bike(
  id UNSIGNED MEDIUMINT(10) NOT NULL,
  size CHAR(2) NOT NULL,
  wheel_size UNSIGNED TINYINT(3) BOOLEAN NOT NULL,
  shifter VARCHAR(60) NOT NULL,
  user_id UNSIGNED MEDIUMINT(10) NOT NULL
);

ALTER TABLE bike
  ADD PRIMARY KEY(id);

ALTER TABLE bike
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE bike;