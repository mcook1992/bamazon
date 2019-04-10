CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(250),
    department_name VARCHAR(250),
    price DECIMAL,
    stock_quantity INTEGER
   
); 

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("phone", "electronics", 100.00, 10), ("blender", "kitchen", 50.00, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("computer", "electronics", 300.00, 5), ("coffee maker", "kitchen", 25.00, 8), ("Sabriel", "Booksn", 10.00, 15), ("Name of the Wind", "Books", 15.00, 10), ("V for Vendetta", "Movies", 15.00, 7), ("The Matrix", "Movies", 12.00, 8), ("Pants", "Clothing", 30.00, 8), ("Shirt", "Clothing", 10.00, 5);
