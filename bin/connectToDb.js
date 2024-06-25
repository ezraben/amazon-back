const mysql = require("mysql2");
const chalk = require("chalk");
const { pool } = require("../models/mySqlPool");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.MYSQLPASSWORD,
  database: "amazonMySql",
});

try {
  con.connect(function (err) {
    if (err) throw err;
    console.log(chalk.greenBright("connected to db"));
    console.log("Listening on " + chalk.bgGreen.bold(process.env.port));
    const usersSchema =
      "CREATE TABLE IF NOT EXISTS users (id int NOT NULL AUTO_INCREMENT,firstName VARCHAR(255), lastName VARCHAR(255), email VARCHAR(255), address VARCHAR(255), isAdmin BOOL,password VARCHAR(255), PRIMARY KEY (id))";

    con.query(usersSchema, function (err, result) {
      if (err) throw err;
    });
  });
} catch (err) {
  console.log("err", err);
}

module.exports = con;
