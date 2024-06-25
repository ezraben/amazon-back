const express = require("express");
const router = express.Router();

// const users = require("./users");
const auth = require("./auth");
const products = require("./products");
const users = require("./users");
// const bot = require("./bot");

router.use("/users", users);
router.use("/auth", auth);
router.use("/products", products);
// router.use("/bot", bot);

module.exports = router;
