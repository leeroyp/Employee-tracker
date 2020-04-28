var mysql = require("mysql");
var inquirer = require("inquirer");


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
            choices: [
                "View employees",
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
            }
           else if(answer.action === "View department") {
              viewDepartment();
            } 
            else if(answer.action === "View roles") {
                viewRoles();
              } 
              else  if(answer.action === "Add department") {
                addDepartment();
              } 
              else  if(answer.action === "Add roles") {
               addRole();
              } 
              else  if(answer.action === "Add employees") {
                addEmployee();
              }
              else  if(answer.action === "Update Employee Role") {
                updateEmployee();
              } 
            
            else{
              connection.end();
            }
          });
      };


      function viewEmployee(){
          connection.query("SELECT * FROM employee", function (err, res) {
            console.table(res)
            start();
        })
    };

    function viewDepartment() {
        connection.query("SELECT * FROM department", function (err, res) {
            console.table(res);
            start();
        })
    }
    function viewRoles(){
        connection.query("SELECT * FROM roles", function(err, res) {
          console.table(res);
          start();
          
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
                    if (err) 
                        throw err;
                    
                    console.log(`${first} added!`);
                    start();
                });
          
        });
};

    function addDepartment(){

        inquirer.prompt([{
            type: "input",
            name: "department",
            message: "What is the department that you want to add?"
        }, ]).then(function(res) {
            connection.query('INSERT INTO department (department) VALUES (?)', [res.department], function(err, res) {
                if (err) throw err;
                console.table("Successfully Inserted");
               start();
            })
        })
    }

    function addRole(){
        inquirer.prompt([
            {
                message: "enter title:",
                type: "input",
                name: "title"
            }, {
                message: "enter salary:",
                type: "number",
                name: "salary"
            }, {
                message: "enter department ID:",
                type: "number",
                name: "department_id"
            }
        ]).then(function (response) {
            connection.query("INSERT INTO roles (title, salary, department_id) values (?, ?, ?)", [response.title, response.salary, response.department_id], function (err, data) {
                console.table(data);
            })
            start();
        })
    
    }

    function updateEmployee(){
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
                    function(err, data){
                        
                        console.log("Role has been updated!");
                        start();
                    })
                })
        }

