var inquirer = require("inquirer");
var mysql = require("mysql");
var returnedArray;

var selectedItem;

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306

  port: 3306,

  // Your username

  user: "root",

  // Your password

  password: "Shmaavmc1",

  database: "bamazon"
});

//getting initial data from SQL right away for a smooth running experience

getAllData();

function getAllData() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;

    returnedArray = res;

    // addToQuantity("The Matrix", 10);
  });
}

initialInquirerCall();

function initialInquirerCall() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
          "Add to Inventory",
          "Add product",
          "View Low Inventory",
          "View all items",
          "Exit"
        ],
        filter: function(val) {
          return val.toLowerCase();
        }
      }
    ])
    .then(function(inquirerResponse) {
      switch (inquirerResponse.action) {
        case "add product":
          inquirer
            .prompt([
              {
                type: "input",

                message: "Please type the name of the item you'd like to add:",

                name: "name"
              },
              {
                type: "input",

                message: "Please type the department that item belongs to:",

                name: "department"
              },
              {
                type: "input",

                message: "Please type the price of that object:",

                name: "price"
              },
              {
                type: "input",

                message:
                  "Please type the number of this item you'd like to add:",

                name: "quantity"
              }
            ])
            .then(function(inquirerResponse) {
              addToInventory(
                inquirerResponse.name,
                inquirerResponse.department,
                inquirerResponse.price,
                inquirerResponse.quantity
              );
            });

          break;
        case "add to inventory":
          inquirer
            .prompt([
              {
                type: "input",

                message:
                  "Please type the name of the item you'd like to add more stock to:",

                name: "name"
              },
              {
                type: "input",

                message: "Please type number of units you'd like to add",

                name: "quant"
              }
            ])
            .then(function(inquirerResponse) {
              addToQuantity(inquirerResponse.name, inquirerResponse.quant);
            });

          //statements
          break;
        case "view low inventory":
          viewLowInventory();

          //statements
          break;
        case "view all items":
          viewAllObjects();

          break;
        default:
          connection.end();
      }
    });
}

//SQL functions:

function addToInventory(product_name, department_name, price, stock_quantity) {
  connection.query(
    "INSERT INTO products SET ?",

    {
      product_name: product_name,

      department_name: department_name,

      price: price,

      stock_quantity: stock_quantity
    },

    function(err, res) {
      console.log(product_name + " added successfully!");

      initialInquirerCall();
    }
  );
}

function addToQuantity(product_name, numberOfItems) {
  //creating an element to store necessary information

  var currentElement;

  //first establish that the product they typed in actually exists

  returnedArray.forEach(function(element) {
    if (element.product_name == product_name) {
      currentElement = element;
    }
  });

  connection.query(
    "UPDATE products SET stock_quantity = " +
      (numberOfItems + currentElement.stock_quantity) +
      " WHERE id = " +
      currentElement.id,
    // UPDATE products SET `quantity` = 100 WHERE `flavor` = 'Rocky Road'

    function(err, res) {
      if (err) {
        console.log("Sorry, we couldn't find that item in the database");
        initialInquirerCall();
      } else {
        console.log("Congratulations! You added " + numberOfItems + " units!");
        initialInquirerCall();
      }
    }
  );
}

function viewLowInventory() {
  connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(
    err,
    res
  ) {
    if (err) throw err;

    console.log("Here's inventory that is running low ");

    returnedArray = res;

    res.forEach(function(element) {
      console.log(
        "Item ID: " +
          element.id +
          "   " +
          "Item Name: " +
          element.product_name +
          "   " +
          "Department: " +
          element.department_name +
          "   " +
          "Price: " +
          element.price
      );
    });

    initialInquirerCall();
  });
}

function viewAllObjects() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;

    console.log("Here are all the objects");

    returnedArray = res;

    res.forEach(function(element) {
      console.log(
        "Item ID: " +
          element.id +
          "   " +
          "Item Name: " +
          element.product_name +
          "   " +
          "Department: " +
          element.department_name +
          "   " +
          "Price: " +
          element.price
      );
    });

    initialInquirerCall();
  });
}
