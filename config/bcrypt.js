const bcrypt = require("bcryptjs");

const hashPassword = (password) => {
  return bcrypt.hash(password, 10);
};

const compareHashedPassword = (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

module.exports = { hashPassword, compareHashedPassword };
