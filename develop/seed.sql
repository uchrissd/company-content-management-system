/* Seeds for SQL table. We haven't discussed this type of file yet */
USE employee_tracker_db;
/* Insert 3 Rows into your new table */
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ("Chris", "Underwood", 1, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ("Joe", "Smith", 1, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ("Carlos", "Gonzalez", 1, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ("Anne", "Thomas", 1, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ("Jane", "Green", 1, 1);
INSERT INTO department (name)
VALUES
  ("Engineering");
INSERT INTO department (name)
VALUES
  ("Accounting");
INSERT INTO department (name)
VALUES
  ("Legal");
INSERT INTO department (name)
VALUES
  ("Sales");
INSERT INTO department (name)
VALUES
  ("Marketing");
INSERT INTO roles (title, salary, department_id)
VALUES
  ("Developer", 80000, 1);
INSERT INTO roles (title, salary, department_id)
VALUES
  ("Accountant", 70000, 2);
INSERT INTO roles (title, salary, department_id)
VALUES
  ("Lawyer", 100000, 3);
INSERT INTO roles (title, salary, department_id)
VALUES
  ("Sales Rep", 75000, 4);
INSERT INTO roles (title, salary, department_id)
VALUES
  ("Creative Director", 75000, 5);