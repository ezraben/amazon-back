// const mysql = require("mysql2");
const pool = require("../models/mySqlPool");

const productsSchema =
  "CREATE TABLE IF NOT EXISTS products (id int NOT NULL AUTO_INCREMENT,productName VARCHAR(255), productPrice int, category VARCHAR(255), productCreator VARCHAR(255),  PRIMARY KEY (id))";

pool.execute(productsSchema);

const addProduct = (data, err) => {
  return pool.execute(
    `insert into products( productName, productPrice,category, productCreator)VALUES (?,?,?,?)`,
    data
    // function (err, rows, fields) {
    //   // Connection is automatically released when query resolves
    // }
  );
};

const getAllProducts = (data, err) => {
  return pool.execute(`SELECT * FROM products`);
};

const findProductById = (data, err) => {
  // console.log("dataaa", data);
  return pool.execute(`SELECT * FROM products WHERE id=${data}`);
};

const findProductByMultipleIds = (data, err) => {
  console.log("here", data);
  // for(let x=0; x<data.length; x++){

  // }
  return pool.execute(`SELECT * FROM products WHERE id= ${data}`);
};
const findProductByName = (data) => {
  return pool.execute(`SELECT * FROM products WHERE productName= '${data}'`);
};

///////////////////////////////
// test of getting them as array
// const findProductByMultipleIds = (data, err) => {
//   console.log("here", data);
//   // for(let x=0; x<data.length; x++){

//   // }
//   return pool.execute(`SELECT * FROM products WHERE id= ${data}`);
// };
///////////////////////////////
// until here test of getting them as array

const getProductsByCategory = (data) => {
  console.log("data", data);
  return pool.execute(`SELECT * FROM products WHERE category='${data}'  `);
};

const editProductById = (data, err) => {
  return pool.execute(
    `UPDATE  products
     SET productName ='${data.productName}', productPrice='${data.productPrice}', category='${data.category}', productCreator='${data.productCreator}'
    
    WHERE id=${data.id}`
  );
};

const deleteProductById = (id) => {
  return pool.execute(`DELETE  FROM products WHERE id=${id} `);
};

const productsByCreator = (email) => {
  return pool.execute(
    `SELECT * FROM products WHERE productCreator='${email}'  `
  );
};

module.exports = {
  addProduct,
  getAllProducts,
  findProductById,
  findProductByName,
  findProductByMultipleIds,
  getProductsByCategory,
  editProductById,
  deleteProductById,
  productsByCreator,
};
