var inquirer = require("inquirer");
var mysql = require("mysql");
var DB = require("./databaseCode");
var returnedArray;
var arrayOfNames = [];

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

    console.log("Welcome to Bamazon! Pick an item you'd like to buy");

    returnedArray = res;

    res.forEach(function(element) {
      var itemName = element.product_name + " $" + element.price;
      arrayOfNames.push(itemName);

      // console.log(
      //   "Item ID: " +
      //     element.id +
      //     "   " +
      //     "Item Name: " +
      //     element.product_name +
      //     "   " +
      //     "Price: " +
      //     element.price
      // );
    });
  });
});

setTimeout(initialInquirerCall, 500);

function initialInquirerCall() {
  inquirer
    .prompt([
      {
        type: "list",

        message: "Please select the item you'd like to buy",

        choices: arrayOfNames,

        name: "buyItem"
      },
      {
        type: "input",

        message: "How many would you like to buy?",

        name: "quantity"
      }
    ])
    .then(function(inquirerResponse) {
      //taking their inquirer response and converting it to just the name
      var usableString = inquirerResponse.buyItem.substring(
        0,
        inquirerResponse.buyItem.indexOf("$")
      );
      //trimming the string so that it matches with the names in the database
      var newString = usableString.trim();

      //making sure it's not a string object but just a string

      returnedArray.forEach(function(element) {
        if (element.product_name === newString) {
          DB.updateProduct(
            element.id,
            inquirerResponse.quantity,
            returnedArray
          );
        }
      });
    });
}

module.exports = {
  initialInquirerCall: initialInquirerCall
};
