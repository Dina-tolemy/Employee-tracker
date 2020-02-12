var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Rody@1234",
    database: "company_DB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    main();
});


function main() {

    inquirer
        .prompt([{
            type: "list",
            message: "What would you like to do?",
            name: "userChoise",
            choices: ["Show all employees", "View all departments", "View all roles", "Add an employee", "Add a department", "Add new role", "Update employee role"]
        }]).then(firstCallback)
}

function firstCallback(answer) {

    if (answer.userChoise === "Show all employees") {

        showEmployee();
    }
    else if (answer.userChoise === "View all departments") {

        viewDepartments();
    }

    else if (answer.userChoise === "View all roles") {

        viewRoles();
    }
    else if (answer.userChoise === "Add an employee") {

        addEmployee();
    }

    else if (answer.userChoise === "Add a department") {

        addDepartments();
    }

    else if (answer.userChoise === "Add new role") {

        addRoles();
    }
    else if (answer.userChoise === "Update employee role") {

        viewRoles1();
        updateEmployeeDetails();
    }

    else (console.log("something wrong"))
}

function showEmployee() {
    connection.query('SELECT  * FROM employee;', function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + " | " + res[i].firstName + " | " + res[i].lastName + " | " + res[i].role_id);
        }
        console.log("------------------------------------------------------------------");
        main();
    })

};
function viewDepartments() {
    connection.query('SELECT  * FROM department;', function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + " | " + res[i].dep_name);
        }
        console.log("------------------------------------------------------------------");
        main();
    })
}

function viewRoles1() {

    connection.query('SELECT  * FROM emp_role;', function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + " | " + res[i].title + " | " + res[i].salary + " | " + res[i].department_id);
        }
        console.log("------------------------------------------------------------------");
    })
}
function viewRoles() {

    connection.query('SELECT  * FROM emp_role;', function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + " | " + res[i].title + " | " + res[i].salary + " | " + res[i].department_id);
        }
        console.log("------------------------------------------------------------------");
        main();
    })
}
function addEmployee() {
    inquirer.
        prompt([{
            type: "input",
            message: "Enter employee First name:",
            name: "firstName"
        },
        {
            type: "input",
            message: "Enter employee last name:",
            name: "lastName"
        }, {
            type: "input",
            message: "Enter employee role ID:",
            name: "roleId"

        }
        ]).then(function (answers) {

            connection.query("INSERT INTO employee SET ?",
                {
                    firstName: answers.firstName,
                    lastName: answers.lastName,
                    role_id: answers.roleId
                },
                function (err, res) {
                    if (err) throw err;

                    console.log(" Your new employee has been added");
                    showEmployee();
                    main();

                })


        })
}
function addDepartments() {
    inquirer.
        prompt([{
            type: "input",
            message: "Enter new department name:",
            name: "depName"
        }
        ]).then(function (answer) {

            connection.query("INSERT INTO department SET ?",
                {
                    dep_name: answer.depName,
                },
                function (err, res) {
                    if (err) throw err;

                    console.log(" Your new department has been added");
                    viewDepartments();
                    main();

                })


        })



}
function addRoles() {

    inquirer.
        prompt([{
            type: "input",
            message: "Enter new role title:",
            name: "roleTitle"
        },
        {
            type: "input",
            message: "Enter the new role salary:",
            name: "roleSalary"

        }, {
            type: "input",
            message: "Enter new role department ID:",
            name: "roleDePId"
        }
        ]).then(function (answer) {

            connection.query("INSERT INTO emp_role SET ?",
                {
                    title: answer.roleTitle,
                    salary: answer.roleSalary,
                    department_id: answer.roleDePId
                },
                function (err, res) {
                    if (err) throw err;

                    console.log(" Your new role has been added");
                    viewRoles();
                    main();

                })


        })

}
function updateEmployeeDetails() {
    inquirer.
        prompt([{
            type: "input",
            message: "Enter employee new role id:",
            name: "roleId"
        }, {
            type: "input",
            message: "Enter employee fisrt name:",
            name: "empFName"

        }, {
            type: "input",
            message: "Enter employee last name:",
            name: "empLName"
        }

        ]).then(function (answer) {
            connection.query("UPDATE employee SET ? WHERE ?",
                [
                    {
                        role_id: answer.roleId
                    },
                    {
                        firstName: answer.empFName
                        // lastName : answer.empLName
                    }
                ], function (err, res) {
                    if (err) throw err;
                    console.log(" Your employee role has been added");
                    showEmployee();
                    main();
                })

        })
}

