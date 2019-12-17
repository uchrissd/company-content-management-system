/*
To run this file, we do the following in our Terminal:
1. Go to the directory of this sql file.
2. Get into our mysql console.
3. Run "source schema.sql"
*/
-- Drops the day_planner_db if it already exists --
DROP DATABASE IF EXISTS employee_tracker_db;
-- Create the database day_planner_db and specified it for use.
CREATE DATABASE employee_tracker_db;
USE employee_tracker_db;
-- Create the table plans.
CREATE TABLE department (
  id int NOT NULL AUTO_INCREMENT,
  name VARCHAR (30) NOT NULL,
  PRIMARY KEY (id)
);
CREATE TABLE roles (
  id int NOT NULL AUTO_INCREMENT,
  title VARCHAR (30) NOT NULL,
  salary DECIMAL,
  department_id INT,
  PRIMARY KEY (id)
);
CREATE TABLE employee (
  id int NOT NULL AUTO_INCREMENT,
  first_name varchar (30) NOT NULL,
  last_name varchar (30) NOT NULL,
  role_id INT,
  manager_id INT,
  PRIMARY KEY (id)
);
CREATE TABLE manager (
  id int NOT NULL AUTO_INCREMENT,
  first_name varchar (30) NOT NULL,
  last_name varchar (30) NOT NULL,
  PRIMARY KEY (id)
);