var mysql = require("mysql");
var inquirer = require("inquirer");
var util = require("util");


// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Stembiso369",
    database: "employee_trackerDB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});


function start() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "what would you like to do ?",
            choices: ["View employees",
                "View Department",
                "View roles",
                "Add department",
                "Add roles",
                "Add employees",
                "Update Employee Role",
            ]
        })
        .then(function(answer) {
            // based on their answer, either call the bid or the post functions
            if (answer.action === "View employees") {
              viewEmployee();
            };
            if(answer.action === "View department") {
              viewDepartment();
            } ;
            if(answer.action === "View roles") {
                viewRoles();
              } ;
            if(answer.action === "Add department") {
                addDepartment();
              } ;
            if(answer.action === "Add roles") {
               addRole();
              } ;
            if(answer.action === "Add employees") {
                addEmployee();
              }; 
            if(answer.action === "Update Employee Role") {
                updateEmployee();
              } 
            
            else{
              connection.end();
            }
          });
      };


      function viewEmployee(){
          console.log("Selecting all employees...\n");
          connection.query("SELECT * FROM employee", function (err, rows) {
            if (err) {
                throw err;
            }
            rows.forEach(function (row) {
                console.table(`ID: ${row.id} | Name: ${row.first_name} ${row.last_name} | Role ID: ${row.role_id} | Manager ID: ${row.manager_id}`)
            });
            start();
        })
    };
        


      function viewDepartment(){
        console.log("Selecting all department...\n");
        connection.query("SELECT * FROM department", function(err, res) {
          if (err) throw err;
          // Log all results of the SELECT statement
          console.log(res);
          
        });        
    };
    function viewRoles(){
        console.log("Selecting all role...\n");
        connection.query("SELECT * FROM role", function(err, res) {
          if (err) throw err;
          // Log all results of the SELECT statement
          console.log(res);
          
        });
    };

    function addEmployee(){
       
        inquirer
        .prompt([
            {
                name: "firstName",
                type: "input",
                message: "What is the first name of the employee?"
            },
            {
                name: "lastName",
                type: "input",
                message: "What is the last name of the employee?"
            },
            {
                name: "roleId",
                type: "input",
                message: "What is the employee's ID?"
            },
            {
                name: "mngId",
                type: "input",
                message: "What is the ID of the employee's manager?"
            },

        ])
        .then(function (empAnswer) {
            var first = empAnswer.firstName;
            var last = empAnswer.lastName;
            var role = empAnswer.roleId;
            var managerId = empAnswer.mngId;

            connection.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES("${first}", "${last}", ${role}, ${managerId})`,
                function (err, data) {
                    if (err) {
                        throw err;
                    }
                    console.log(`${first} added!`);
                    start();
                });
          
        });
};

    function addDepartment(){

        inquirer
        .prompt([
            {
                name: "addDept",
                type: "input",
                message: "What department would you like to add?"
            }
        ])
        .then(function (deptAnswer) {
            let departmentName = deptAnswer.departmentName;
            connection.query(
                "INSERT INTO department(name) VALUES(?)",
                {
                    departmentName
                },
                function (err, data) {
                    if (err) {
                        throw err;
                    };
                    console.log(`${departmentName} was added successfully!`);
                    start();
                }
            )
        })
    }

    function addRole(){
        console.log('add role ')
        inquirer
        .prompt([
            {
                name: "newTitle",
                type: "input",
                message: "What is the title of the new role?"
            },
            {
                name: "newSalary",
                type: "input",
                message: "What is the salary of the new role?"
            },
            {
                name: "departId",
                type: "input",
                message: "What is the department ID of the new role?"
            }
        ])
        .then(function (addRoleAnswer) {
            var role = addRoleAnswer.newTitle;
            var salary = addRoleAnswer.newSalary;
            var deptId = addRoleAnswer.departId;
            connection.query(
                `INSERT INTO role(title, salary, department_id) VALUES("${role}", ${salary}, ${deptId})`,
                function (err, data) {
                    if (err) {
                        throw err;
                    };
                    console.log(`${role} was added!`);
                    runSearch();
                }
            )
        })
};

    function updateEmployee(){
        console.log('update empoyee')
        connection.query("SELECT * FROM employee", function (err, rows) {
            if (err){
                throw err;
            } 
            console.table(rows);
            inquirer
                .prompt([
                    {
                        type: "input",
                        message: "What is the employee's ID you wish to change roles?",
                        name: "ogId"
                    },
                    {
                        type: "input",
                        message: "What is the new role ID of said employee?",
                        name: "newRoleId"
                    }
                ])
                .then(function(res){
                    connection.query(`UPDATE employee SET role_id = ${res.newRoleId}`, 
                    function(err){
                        if(err) {
                            throw err;
                        }
                        console.log("Role has been updated!");
                        runSearch();
                    })
                })
        })
    };

