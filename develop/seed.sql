/* Seeds for SQL table. We haven't discussed this type of file yet */
USE employee_tracker_db;
/* Insert 3 Rows into your new table */
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ("Chris", "Underwood", 1, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ("Joe", "Smith", 1, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ("Carlos", "Gonzalez", 1, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ("Anne", "Thomas", 1, NULL);
INSERT INTO manager (first_name, last_name)
VALUES
  ("Tom", "Black");
INSERT INTO manager (first_name, last_name)
VALUES
  ("Mary", "Shoemaker");
INSERT INTO manager (first_name, last_name)
VALUES
  ("Gunther", "Johnson");
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
INSERT INTO roles (title, salary, department_id)
VALUES
  ("Engineer", 80000, 1);
INSERT INTO roles (title, salary, department_id)
VALUES
  ("Accountant", 70000, 2);
INSERT INTO roles (title, salary, department_id)
VALUES
  ("Lawyer", 100000, 3);
INSERT INTO roles (title, salary, department_id)
VALUES
  ("Sales Rep", 75000, 4);
SELECT
  *
FROM employee;
SELECT
  *
FROM department;
SELECT
  *
FROM roles;
SELECT
  *
FROM manager;