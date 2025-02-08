-- User creation example, replace 'user' & 'password'
CREATE USER 'healthuser'@'localhost' IDENTIFIED BY 'healthpasswd';
GRANT ALL PRIVILEGES ON `HealthDiary`.* TO 'user'@'localhost';
FLUSH PRIVILEGES;
