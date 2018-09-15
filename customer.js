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

});

var userName;
var userEmail;


function printDatabase() {
    var numberOfRows;
    connection.query("SELECT COUNT(id) AS NumberOfProducts FROM inventory", function (err, res) {
        if (err) throw err;
        console.log(res[0].NumberOfProducts)
        numberOfRows = parseInt(res[0].NumberOfProducts);
    });


    connection.query("SELECT * FROM inventory", function (err, res) {
        if (err) throw err;

        var table = new Table({
            head: ['Name', 'Cost', 'Category']
            , colWidths: [30, 20, 30]
        });

        for (var i = 0; i < numberOfRows; i++) {
            table.push(
                [res[i].item_name, res[i].item_cost, res[i].item_category],
            );

        };
        console.log(table.toString());
        selectForPurchase();
    });
};


function selectForPurchase() {
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
                    name: "purchaseItem",
                    message: "Which item would you like to purchase?",
                    choices: itemNameArray
                },
                {
                    type: "input",
                    name: "qtyForPurchase",
                    message: "Enter the quantity you would like to purchase.",
                },

            ]).then(function (user) {
                console.log(user.purchaseItem + "  " + user.qtyForPurchase);
                // function to check if the items are instock
                // checkQuantity(item, quantity);
                checkQuantity(user.purchaseItem, user.qtyForPurchase);
            });
        }
    );
};

function checkQuantity(x, y) {
    connection.query(
        `SELECT item_quantity FROM inventory WHERE item_name = '${x}'`,
        function (err, res) {
            if (err) throw err;
            // console.log(res[0].item_quantity)
            var numberInStock = parseFloat(res[0].item_quantity);
            // console.log(numberInStock + "  " + parseFloat(y))
            if ((numberInStock - parseFloat(y)) >= 0) {
                console.log("there are enough for you to buy");
                updateProduct(x, y);
                makePurchase(x, y);

            } else {

                inquirer.prompt([
                    {
                        type: "list",
                        name: "buyOrReturn",
                        message: `There are currently only ${numberInStock} in stock. Would you like to purchase the remaining ${numberInStock}?`,
                        choices: [`Purchase the ${numberInStock} in stock.`, "Return to Main Menu."]
                    },


                ]).then(function (user) {
                    console.log(user.buyOrReturn);
                    if (user.buyOrReturn === "Return to Main Menu.") {
                        // return to main menu
                        console.log("return to main menu");
                        shop();
                    } else {
                        // console.log("go ahead with purchase");
                        updateProduct(x, numberInStock);
                        makePurchase(x, numberInStock);
                    }
                });
            }
        });
};


function updateProduct(x, y) {
    console.log("updating products \n");
    var newQty;
    connection.query(`SELECT item_quantity FROM inventory WHERE ?`,
        {
            item_name: x
        },
        function (err, res) {
            if (err) throw err;
            var currentQty = parseFloat(res[0].item_quantity);
            var additionalQty = parseFloat(y);
            newQty = currentQty - additionalQty;
            connection.query(
                "UPDATE inventory SET ? WHERE ?",
                [
                    {
                        item_quantity: newQty
                    },
                    {
                        item_name: x
                    }
                ],
                function (err, res) {
                    console.log(res.affectedRows + "products updated \n");
                }
            );
            // connection.end();
        });
};


function makePurchase(x, y) {
    // name is x, quantity is y

    console.log(`
${userName},
    Your purchase of ${y} ${x}(s) will be processes
    as soon as possible. Please enter your mailing
    information in the link below.
    
    Thank You,
    Bamazon!`);



}












inquirer.prompt([
    {
        type: "input",
        name: "customerName",
        message: "Enter your name.",
    },
    {
        type: "input",
        name: "customerEmail",
        message: "Enter your email.",
    },

]).then(function (user) {
    userName = user.customerName;
    userEmail = user.customerEmail;
    // console.log(user.customerName+ "  " + user.customerEmail);
    console.log(`Welcome ${user.customerName}.`)
    shop();
});



function shop() {
    inquirer.prompt([
        {
            type: "list",
            name: "searchType",
            message: "Would you like to shop the entire store or by category?",
            choices: ["Shop entire store.", "Shop by category.", "Exit"]
        },

    ]).then(function (user) {
        console.log(user.searchType);
        if (user.searchType === "Shop entire store.") {
            // function to view entire store
            printDatabase();
        } else if (user.searchType === "Shop by category.") {
            // function to select from category

        } else if (user.searchType === "Exit") {
            // exit program
        }

    });
};