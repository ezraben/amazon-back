const pool = require("../models/mySqlPool");

const insertNewUser = (data, err) => {
  return pool.execute(
    `INSERT INTO users(firstName,lastName,email,address,isAdmin,password)VALUES (?,?,?,?,?,?)`,
    data
  );
};

const getAllUsers = () => {
  return pool.execute("select * from users");
};

const selectUserByMail = (userEmail) => {
  return pool.execute(`SELECT * FROM users WHERE email = ?`, [userEmail]);
};

const removeUser = (userEmail) => {
  return pool.execute(`DELETE FROM users WHERE email ='${userEmail}'`);
};
module.exports = {
  insertNewUser,
  getAllUsers,
  selectUserByMail,
  removeUser,
};
