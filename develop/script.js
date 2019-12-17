const mysql = require("mysql");
const inquirer = require("inquirer");

// create the connection information for the sql database
const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "chris",
  database: "employee_tracker_db"
});

connection.connect(function(err) {
  if (err) throw err;

  //   readDepartment();
  runProgram();
  //   readEmployee();
});

function runProgram() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "Add a role?",
        "Add an employee?",
        "View departments?",
        "View roles?",
        "View employees?",
        "Update employee roles?",
        "exit"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
        case "Add a role?":
          addRole();
          break;

        case "Add an employee?":
          addEmployee();
          break;

        case "View departments?":
          viewDepartments();
          break;

        case "View roles?":
          viewRoles();
          break;

        case "View employees?":
          viewEmployees();
          break;

        case "Update employee roles?":
          updatesEmployeeRoles();
          break;

        case "exit":
          connection.end();
          break;
      }
    });
}

function viewDepartments() {
  connection.query("SELECT * FROM department", function(err, res) {
    if (err) throw err;

    // Log all results of the SELECT statement
    console.table(res);
    // res.forEach(e => {
    //   console.log(e.name);
    // });
    connection.end();
  });
}

function viewRoles() {
  connection.query("SELECT * FROM roles", function(err, res) {
    if (err) throw err;

    // Log all results of the SELECT statement
    console.table(res);
    //   res.forEach(e => {
    //     console.log(e.name);
    //   });
    connection.end();
  });
}

function viewEmployees() {
  connection.query("SELECT * FROM employee", function(err, res) {
    if (err) throw err;

    // Log all results of the SELECT statement
    console.table(res);
    //   res.forEach(e => {
    //     console.log(e.name);
    //   });
    connection.end();
  });
}
