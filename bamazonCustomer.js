var inquirer = require("inquirer");
var mysql = require("mysql");
var returnedArray;
var arrayOfNames;

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

connection.connect(function(err) {
  if (err) throw err;

  //making sure connection works

  //   console.log("connected as id " + connection.threadId);

  //displaying all the objects to the user as soon as they log on
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;

    console.log("Welcome to Bamazon! Here's what we have in stock: ");

    returnedArray = res;

    res.forEach(function(element) {
      console.log(
        "Item ID: " +
          element.id +
          "   " +
          "Item Name: " +
          element.product_name +
          "   " +
          "Price: " +
          element.price
      );
    });
  });
});

setTimeout(initialInquirerCall, 500);

function initialInquirerCall() {
  inquirer
    .prompt([
      {
        type: "input",

        message: "Please type in the id of the item you'd like to buy",

        name: "buyItem"
      },
      {
        type: "input",

        message: "How many would you like to buy?",

        name: "quantity"
      }
    ])
    .then(function(inquirerResponse) {
      updateProduct(inquirerResponse.buyItem, inquirerResponse.quantity);
    });
}
//updating product based on the user inputs

function updateProduct(id, quantity) {
  var currentStockQuantity;
  var totalPrice;

  //keeping track of whether the user input is valid
  var idMatchesElementinArray = false;

  returnedArray.forEach(function(element) {
    if (element.id == id) {
      selectedItem = element;
      totalPrice = element.price * quantity;
      currentStockQuantity = element.stock_quantity - quantity;
      idMatchesElementinArray = true;

      // console.log(
      //   selectedItem + "  " + currentStockQuantity + "  " + totalPrice + "  "
      // );
    }
  });

  if (idMatchesElementinArray == false) {
    console.log(
      "We're sorry. The id you typed doesn't match an item in our catalogue. Please consult the catalogue and try again"
    );

    initialInquirerCall();
  } else if (currentStockQuantity < 0) {
    console.log(
      "Sorry, we do not have enough of the item in stock to complete your order. we currently only have " +
        selectedItem.stock_quantity +
        " number left. Please try placing another order"
    );

    initialInquirerCall();
  } else {
    connection.query(
      "UPDATE products SET stock_quantity = " +
        currentStockQuantity +
        " WHERE id = " +
        id,
      // UPDATE products SET `quantity` = 100 WHERE `flavor` = 'Rocky Road'

      function(err, res) {
        if (err) {
          console.log(err);
        } else {
          console.log(
            "Congratulations! Your " +
              totalPrice +
              " dollar purchase was successful!"
          );

          connection.end();
        }
      }
    );
  }
}
