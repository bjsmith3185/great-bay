var Table = require('cli-table');
var mysql = require("mysql");
var chalk = require("chalk");
var inquirer = require("inquirer");

var table = new Table({
    head: ['Name', 'Category', 'Cost', 'Quantity']
    , colWidths: [30, 30, 30, 30]
});


var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "December25",
    database: "records_db"
});



// inquirer.prompt([

//     // {
//     //   type: "input",
//     //   name: "name",
//     //   message: "Who are you???"
//     // },

//     {
//       type: "list",
//       name: "firstTask",
//       message: "What do you want to do?",
//       choices: ["View Database", "Add to Database", "Remove item from Database", "Exit"]
//     }

//     // {
//     //   type: "checkbox",
//     //   name: "carryingWhat",
//     //   message: "What are you carrying in your hands??",
//     //   choices: ["TV", "Slice of Toast", "Butter Knife"]
//     // },

//     // {
//     //   type: "confirm",
//     //   name: "canLeave",
//     //   message: "Can you leave now?"
//     // },

//     // {
//     //   type: "password",
//     //   name: "myPassword",
//     //   message: "Okay fine. You can stay. But only if you say the magic password."
//     // }

//   ]).then(function(user) {

//     console.log(user.firstTask);
//     if (user.firstTask === "View Database") {
//         printDatabase();


//     } else if( user.firstTask === "Add to Database") {

//     } else if (user.firstTask === "Remove item from Database") {

//     } else if (user.firstTask === "Exit") {

//     }

//   });


function createProduct(x, y, a, b) {
    console.log("inside createProduct \n");
    var query = connection.query(
        "INSERT INTO inventory SET ?",
        {
            item_name: x,
            item_category: y,
            item_cost: a,
            item_quantity: b
        },

        function (err, res) {
            // console.log("!!!!!!")
            // console.log(res)
            console.log(res.affectedRows + " row inserted. \n");
            // updateProduct();

            // afterConnection();
            // connection.end();
        }

    );
    // afterConnection();
    // console.log(query.sql);
    connection.end();
};








function enterData() {
    inquirer.prompt([

        {
            type: "input",
            name: "name",
            message: "What is the name of the item?"
        },
        {
            type: "list",
            name: "category",
            message: "Which category do it apply to?",
            choices: ["food", "home", "electronics", "other"]
        },
        {
            type: "input",
            name: "cost",
            message: "What is the cost of the item?"
        },
        {
            type: "input",
            name: "quantity",
            message: "What is the quantity to enter?"
        }
    ]).then(function (user) {
        createProduct(user.name,user.category,user.cost,user.quantity)

    });

};
enterData();