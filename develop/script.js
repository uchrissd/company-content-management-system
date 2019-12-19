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

        case "Add a department?":
          addDepartment();
          break;

        case "Add an employee?":
          // Needs to call getMangerNames first to run a query to get the info, then runs another function to add employee to database
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
          updateEmployeeRoles();
          break;

        case "exit":
          connection.end();
          break;
      }
    });
}

//Function that returns all of the data from the role table
getRoleResponse = function() {
  return new Promise(function(resolve, reject) {
    connection.query("SELECT * FROM roles", function(err, res) {
      if (err) throw err;

      // return res;
      resolve(res);
    });
  });
};

//Promise function that gets the exployee data from the employee table to be passed to a seperate function
getEmployeeResponse = function() {
  return new Promise(function(resolve, reject) {
    connection.query("SELECT * FROM employee", function(err, res) {
      if (err) throw err;

      // return res;
      resolve(res);
    });
  });
};

//Function that gets table data for all departments
getDepartments = function() {
  return new Promise(function(resolve, reject) {
    connection.query("SELECT * FROM department", function(err, res) {
      if (err) throw err;

      // return res;
      resolve(res);
    });
  });
};

function addEmployee() {
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
        choices: [{ name: "Role test", value: 1 }]
      },
      {
        name: "manager",
        type: "list",
        message: "Who is their manager?",
        choices: ["Manager name"]
      }
    ])
    .then(function(answer) {
      // when finished prompting, insert a new item into the db with that info
      // let managerId = saveManagerIdToEmployee(answer.manager, managersInfo);
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

//Function for removing employees from the employee table
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

// The expected output for this function is a new employee role in the role table in the employee tracker database.
function addRole() {
  getDepartments()
    .then(function(res) {
      console.log("this is the departments res", res);
      inquirer
        .prompt([
          {
            name: "title",
            type: "input",
            message: "What is the title of the new role"
          },

          {
            name: "salary",
            type: "input",
            message: "What is the new role's salary?"
          },

          {
            name: "department",
            type: "list",
            message: "Which department will this new role be a part of?",
            choices: res
          }
        ])
        .then(function(answer) {
          console.log(answer.department);
          let deptId;
          res.forEach(e => {
            if (e.name === answer.department) {
              deptId = e.id;
            }
          });
          connection.query(
            "INSERT INTO roles SET ?",
            {
              title: answer.title,
              salary: answer.salary,
              department_id: deptId
            },
            function(err) {
              if (err) throw err;
            }
          );
        });
    })
    .catch(function(err) {
      console.log("Promise rejection error: " + err);
    });
}

//Function for updating and changing roles in the role table
function updateEmployeeRoles() {
  getEmployeeResponse()
    .then(function(res) {
      console.log("this is the getemployee res", res);
      inquirer
        .prompt([
          {
            name: "employees",
            type: "list",
            message: "Which employee do you want to update?",
            choices: res
          }
        ])
        .then(function(answer) {
          console.log(answer.employee);
          let deptId;
          res.forEach(e => {
            if (e.name === answer.employee) {
              employeeId = e.id;
            }
          });
          connection.query(
            "UPDATE employee SET ? WHERE ?",
            {
              id: employeeId
            },
            function(err) {
              if (err) throw err;
            }
          );
        });
    })
    .catch(function(err) {
      console.log("Promise rejection error: " + err);
    });
}

//Function that adds new departments
function addDepartment() {
  getDepartments()
    .then(function(res) {
      console.log("this is the departments res", res);
      inquirer
        .prompt([
          {
            name: "title",
            type: "input",
            message: "What is the title of the new role"
          },

          {
            name: "salary",
            type: "input",
            message: "What is the new role's salary?"
          },

          {
            name: "department",
            type: "list",
            message: "Which department will this new role be a part of?",
            choices: res
          }
        ])
        .then(function(answer) {
          console.log(answer.department);
          let deptId;
          res.forEach(e => {
            if (e.name === answer.department) {
              deptId = e.id;
            }
          });
          connection.query(
            "INSERT INTO roles SET ?",
            {
              title: answer.title,
              salary: answer.salary,
              department_id: deptId
            },
            function(err) {
              if (err) throw err;
            }
          );
        });
    })
    .catch(function(err) {
      console.log("Promise rejection error: " + err);
    });
}

//Functions for viewing tables are below

//Function that prints table of all employees
function viewEmployees() {
  connection.query("SELECT * FROM employee", function(err, res) {
    if (err) throw err;
    console.table(res);
  });
}

//Function that prints table of managers
function viewManagers() {
  connection.query("SELECT * FROM manager", function(err, res) {
    if (err) throw err;
    // console.log(res);
    console.log(res);
    console.table(res);
  });
}

//Function for printing table of departments
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

//Function for printing table of roles
function viewRoles() {
  getRoleResponse()
    .then(function(res) {
      console.table(res);
    })
    .catch(function(err) {
      console.log("Promise rejection error: " + err);
    });
}
