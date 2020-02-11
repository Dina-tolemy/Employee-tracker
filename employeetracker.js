var mysql = require("mysql");
var inquirer=require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Rody@1234",
    database: "company_DB"
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
          choices:["Show all employees","View all departments","View all roles","Add an employee","Add a department","Add new role","update employee details",]
      }]).then(firstCallback);



  }

  function firstCallback(answers){

    switch(answers) {
        case "Show all employees":
          showEmployee();
          break;
        case "View all departments":
          viewDepartments();
          break;
        case "View all roles":
          viewRoles();
          break;
          case "Add an employee":
            addEmployee();
            break;
          case "Add a department":
            addDepartments();
            break;
          case "Add new role":
            addRoles();
            break;
            case "update employee details":
                updateEmployeeDetails();
                break;
        default:
          console.log("Choose a valid choise");
      }
   // console.log(answers);
  }

