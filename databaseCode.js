//setting up database functions

var mysql = require("mysql");

var bamazonCustomer = require("./bamazonCustomer");

var DBreturnedArray = [];

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

//Get all the data so that it's easier to display

function getAllData() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;

    DBreturnedArray = res;

    // addToQuantity("The Matrix", 10);
  });
}

function updateProduct(id, quantity, returnedArray) {
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
      "We're sorry. we ran into a problem filling your order. Please try again."
    );

    bamazonCustomer.initialInquirerCall();
  } else if (currentStockQuantity < 0) {
    console.log(
      "Sorry, we do not have enough of the item in stock to complete your order. we currently only have " +
        selectedItem.stock_quantity +
        " number left. Please try placing another order"
    );

    bamazonCustomer.initialInquirerCall();
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

module.exports = {
  updateProduct: updateProduct
};
