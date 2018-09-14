
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

connection.connect(function (err) {
    if (err) throw err;
    // console.log("connected as id " + connection.threadId);
    //   createProduct();
    // printDatabase();
    // connection.end();
});

function printDatabase() {
    var numberOfRows;
    connection.query("SELECT COUNT(id) AS NumberOfProducts FROM inventory", function (err, res) {
        if (err) throw err;
        console.log(res[0].NumberOfProducts)
        numberOfRows = parseInt(res[0].NumberOfProducts);
        // connection.end();
    });


    connection.query("SELECT * FROM inventory", function (err, res) {
        if (err) throw err;

        var table = new Table({
            head: ['Name', 'Category', 'Cost', 'Quantity']
            , colWidths: [30, 30, 30, 30]
        });

        for (var i = 0; i < numberOfRows; i++) {
            table.push(
                [res[i].item_name, res[i].item_category, res[i].item_cost, res[i].item_quantity],
            );

        };
        console.log(table.toString());

        //--- putting it into a table
        // var table = new Table({
        //     head: ['Name', 'Category', 'Cost', 'Quantity']
        //   , colWidths: [30, 30, 30, 30]
        // });

        // // table is an Array, so you can `push`, `unshift`, `splice` and friends
        // table.push(
        //   [res[0].item_name, res[0].item_category,res[0].item_cost, res[0].item_quantity],
        //   [res[1].item_name, res[1].item_category,res[1].item_cost, res[1].item_quantity]
        // );

        connection.end();
    });
    // createProduct();
};

function enterData() {


}

function createProduct() {
    console.log("inside createProduct \n");
    var query = connection.query(
        "INSERT INTO inventory SET ?",
        {
            item_name: "tv",
            item_category: "electronics",
            item_cost: 287.00,
            item_quantity: 35
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

// createProduct();
// afterConnection();














function updateProduct() {
    console.log("updating products \n");
    var query = connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                artist: "lionel ritchy"
            },
            {
                genre: "hard core rap"
            }
        ],
        function (err, res) {
            console.log(res.affectedRows + "products updated \n");
            deleteProduct();
        }
    );
    console.log(query.sql);
};





function selectFromList() {
    console.log("selecting from list");

    var numberOfRows;

    connection.query(`SELECT COUNT(item_name) AS NumberOfProducts FROM inventory`, function (err, res) {
        if (err) throw err;
        // console.log(res[0].NumberOfProducts)
        numberOfRows = parseInt(res[0].NumberOfProducts);
        // console.log(numberOfRows);
    });

    var itemNameArray = [];

    connection.query(
        // `SELECT ${x} FROM inventory`,
        `SELECT item_name FROM inventory`,

        function (err, res) {

            for (var i = 0; i < numberOfRows; i++) {
                // console.log(res[i].item_name);
                itemNameArray.push(res[i].item_name);
            }
            // connection.end();
            // console.log(itemNameArray);

            inquirer.prompt([
                        {
                            type: "list",
                            name: "deleteItem",
                            message: "Which item would you like to delete?",
                            choices: itemNameArray
                        }
                
                      ]).then(function(user) {
                console.log(user.deleteItem);
                      deleteProduct(user.deleteItem);
                
                      });


        }
    );

};

selectFromList();

function deleteProduct(x) {
    console.log("deleting all hard core rap");
    connection.query(
        "DELETE FROM inventory WHERE ?",
        {
            item_name: x
        },
        function (err, res) {
            console.log(res.affectedRows + " products deleted. \n");
            connection.end();
        }
    );
};



// function readProducts() {
//     console.log(" inside readProducts(), selecting all products. \n");
//     connection.query("SELECT * FROM products", function (err, res) {
//         if (err) throw (err);
//         console.log(res);
//         connection.end();
//     })
// }





// function mainMenuQuestion() {
//     inquirer.prompt([
//         {
//           type: "list",
//           name: "firstTask",
//           message: "What do you want to do?",
//           choices: ["View Database", "Add to Database", "Remove item from Database", "Exit"]
//         }

//       ]).then(function(user) {

//         console.log(user.firstTask);
//         if (user.firstTask === "View Database") {
//             printDatabase();

//         } else if( user.firstTask === "Add to Database") {
//             enterData();
//         } else if (user.firstTask === "Remove item from Database") {

//         } else if (user.firstTask === "Exit") {

//         }

//       });


// };

