USE biketeams;

-- USERS TABLE
CREATE TABLE user(
  id INT(10) NOT NULL,
  username VARCHAR(25) NOT NULL,
  password VARCHAR(60) NOT NULL,
  fullname VARCHAR(100) NOT NULL,
  birth_date DATE NOT NULL,
  team_id INT(10)
);

ALTER TABLE user
  ADD PRIMARY KEY (id);

ALTER TABLE user
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

ALTER TABLE user
  ADD CONSTRAINT fk_team FOREIGN KEY (team_id) REFERENCES team(id);

DESCRIBE users;

-- TEAM TABLE
CREATE TABLE team (
  id INT(10) NOT NULL,
  teamname VARCHAR(10) NOT NULL
  );

ALTER TABLE team
  ADD PRIMARY KEY(id);

ALTER TABLE team
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE team;

-- TOUR TABLE
CREATE TABLE tour(
  id INT(10) NOT NULL,
  user_id INT(10) NOT NULL,
  team_id INT(10) NOT NULL,
  distance DOUBLE(4,3) NOT NULL,
  duration INT(10),
  date DATE NOT NULL
);

ALTER TABLE tour
  ADD PRIMARY KEY(id);

ALTER TABLE tour
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

ALTER TABLE tour
  ADD CONSTRAINT fk_tour_user FOREIGN KEY (user_id) REFERENCES user(id),
  ADD CONSTRAINT fk_tour_team FOREIGN KEY (team_id) REFERENCES team(id);


DESCRIBE tour;

-- BIKE TABLE
CREATE TABLE bike(
  id INT(10) NOT NULL,
  name VARCHAR(20) NOT NULL,
  size CHAR(2) NOT NULL,
  wheel_size VARCHAR(5) NOT NULL,
  shifter VARCHAR(60) NOT NULL,
  user_id INT(10) NOT NULL
);

ALTER TABLE bike
  ADD PRIMARY KEY(id);

ALTER TABLE bike
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

ALTER TABLE bike
  ADD CONSTRAINT fk_bike_user FOREIGN KEY (user_id) REFERENCES user(id);

DESCRIBE bike;