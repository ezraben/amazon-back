const jwt = require("jsonwebtoken");

const createToken = (data) => {
  return new Promise((resolve, reject) => {
    jwt.sign(data, process.env.JWT_KEY, (err, token) => {
      if (err) {
        reject;
      } else {
        resolve(token);
      }
    });
  });
};

module.exports = { createToken };
