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
          console.log('view employees')
      };
      function viewDepartment(){
        console.log('view deapartment')
    }
    function viewRoles(){
        console.log('view roles')
    }

    function addEmployee(){
        console.log('add employee')
    }

    function addDepartment(){
        console.log('add deparmtne')
    }

    function addRole(){
        console.log('add role ')
    }

    function updateEmployee(){
        console.log('update empoyee')
    }

