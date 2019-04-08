# bamazon

This is a CLI app that interacts with an SQL database. The project is built in node, and incorporates the inquirer and mysql modules.

The app has two different views:

The first view is the bamazonCustomer view. In this view, users can see a full list of products offered by Bamazon, then select the product and quantity they want to buy.

![bamazonCustomer Giphy](https://github.com/mcook1992/bamazon/blob/master/bamazonCustomer1.gif)

Their purchase will update the SQL table that serves as the project's database.

If they try to buy more of a product than is in stock, they will get an alert saying that their purchase cannot be completed:

![bamazonCustomer Giphy] (https://github.com/mcook1992/bamazon/blob/master/bamazonCustomerGiph2.gif)


The second view is the bamazonManager view. This view allows Managers to see the full range of products they have in stock, view products with low inventory, add new products, and add more inventory to existing products.


![bamazonManager Giphy] (https://github.com/mcook1992/bamazon/blob/master/bamazonManagerGiph.gif)

Actions taken in the manager tab also directly influence the SQL table.

