USE company_DB;

INSERT INTO department (dep_name)
VALUES ("sales"), ("Engineering"), ("legal"), ("finance");


INSERT INTO emp_role(title,salary, department_id)
VALUES ("Manger",180000,1),("Engineer",150000,2),("lawyer",200000,3),("accountant",100000,4),("salesman",150000,1);


 INSERT INTO employee(firstName, lastName,role_id)
 VALUES ("Dina","tolemy",5),("Dalia","telemy",6),("ahmed","tolemy",8),("Mo","selim",7),("Roudina","Selim",9),("Omar","Selim",6);

