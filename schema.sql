CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(250),
    department_name VARCHAR(250),
    price DECIMAL,
    stock_quantity INTEGER
   
); 