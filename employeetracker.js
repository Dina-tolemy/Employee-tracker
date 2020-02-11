var mysql = require("mysql");
var inquirer=require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "boston"
  });

  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
   // starting func
   main();
  });


  function main(){
      inquirer
      .prompt([{
          type: "list",
          message: "What would you like to do?",
          name : "userChoise",
          choices:["Show all employee roles","View all departments","View all roles","Add an employee","Add a department","Add new role","update employee details",]
      }]).then(firstCallback);



  }

  function firstCallback(answers){


    console.log(answers.userChoice)
  }

