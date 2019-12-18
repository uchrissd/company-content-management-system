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
        "View managers?",
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

        case "Remove an employee?":
          deleteEmployee();
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

        case "View managers?":
          viewManagers();
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

function addEmployee() {
  let managerNames = [];
  let managersInfo;
  connection.query("SELECT * FROM manager", function(err, res) {
    if (err) throw err;
    managersInfo = res;
    res.forEach(element => {
      managerNames.push(element.first_name + " " + element.last_name);
    });
  });
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "What is their first name?"
      },
      {
        name: "lastName",
        type: "input",
        message: "What is their last name?"
      },
      {
        name: "role",
        type: "list",
        message: "What is their role?",
        choices: ["Engineer", "Accountant", "Lawyer", "Sales Rep"]
      },
      {
        name: "manager",
        type: "list",
        message: "Who is their manager?",
        choices: managerNames
      }
    ])
    .then(function(answer) {
      // when finished prompting, insert a new item into the db with that info
      let managerId = saveManagerIdToEmployee(answer.manager, managersInfo);
      console.log("this is the manager answer", saveManagerIdToEmployee);
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.name,
          last_name: answer.lastName,
          role_id: answer.role,
          manager_id: managerId
        },
        function(err) {
          if (err) throw err;
        }
      );
    });
}

function deleteEmployee() {
  inquirer
    .prompt([
      {
        name: "employees",
        type: "list",
        message: "What is their first name?"
      }
    ])
    .then(function(answer) {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.name,
          last_name: answer.lastName,
          role_id: answer.role,
          manager_id: answer.manager,
          manager_id: answer.manager
        },
        function(err) {
          if (err) throw err;
          console.log("Your auction was created successfully!");
          // re-prompt the user for if they want to bid or post
        }
      );
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
  });
}

function viewRoles() {
  connection.query("SELECT * FROM roles", function(err, res) {
    if (err) throw err;

    // Log all results of the SELECT statement
    console.log("this is the res", res);
    let roleId = [];
    res.forEach(e => {
      console.log(e.id);
    });
    console.log("this is the role id", roleId);
    console.table(res);
    //   res.forEach(e => {
    //     console.log(e.name);
    //   });
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
  });
}

function viewManagers() {
  connection.query("SELECT * FROM manager", function(err, res) {
    if (err) throw err;
    // console.log(res);
    console.log(res);
    console.table(res);
  });
}

function saveManagerIdToEmployee(name, objects) {
  console.log(name, objects);

  objects.forEach(e => {
    if (e.first_name + " " + e.last_name === name) {
      return e.id;
    }
  });
}
