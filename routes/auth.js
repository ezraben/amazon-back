const express = require("express");
const router = express.Router();

const usersModel = require("../models/usersModel");
const userValidation = require("../validation/userValidation");
const bcrypt = require("../config/bcrypt");

const BaseMsg = require("../classes/baseMsg");
const jwt = require("../config/jwt");
const { token } = require("morgan");

router.post(`/singUp`, async (req, res) => {
  try {
    const validatedValue = await userValidation.validateSignUpSchema(req.body);
    const user = await usersModel.selectUserByMail(validatedValue.email);
    // const user = await usersModel.selectUserByMail(req.body.email);

    if (user[0].length > 0) {
      throw new BaseMsg(BaseMsg.STATUSES.Failed, "email already exist");
    }
    const hashedPassword = await bcrypt.hashPassword(req.body.password);

    if (validatedValue) {
      const user = await usersModel.insertNewUser([
        validatedValue.firstName,
        validatedValue.lastName,
        validatedValue.email,
        validatedValue.address,
        validatedValue.isAdmin,
        // validatedValue.password,
        hashedPassword,
      ]);
      const token = await jwt.createToken(validatedValue.email);
      console.log("toke", token);

      console.log("validatedValue", validatedValue);

      res.json(new BaseMsg(BaseMsg.STATUSES.Success, "New user created"));
    }
  } catch (err) {
    console.log("err", err);
    res.json(err);
  }
});

//////////
router.get("/isAdmin", async (req, res) => {
  try {
    const userEmail = req.body.email;

    const user = await usersModel.selectUserByMail(userEmail);
    // const user = user[0][0].email;
    console.log("user", user[0][0].email);
    res.json(user[0][0]);
  } catch (err) {
    console.log("err", err);
    res.json("err", err);
  }
});

//////
router.post(`/login`, async (req, res) => {
  try {
    const userEmail = await usersModel.selectUserByMail(req.body.email);
    if (userEmail[0].length === 0) {
      throw new BaseMsg(BaseMsg.STATUSES.Failed, "email or password incorrect");
    }
    const comparePassword = await bcrypt.compareHashedPassword(
      req.body.password,
      userEmail[0][0].password
    );

    if (comparePassword) {
      const token = await jwt.createToken(req.body.email);
      console.log("token", token);
      const isAdmin = userEmail[0][0].isAdmin;
      console.log("isAdmmin", isAdmin);
      throw new BaseMsg(BaseMsg.STATUSES.Success, token, isAdmin);
    }
    if (!comparePassword) {
      throw new BaseMsg(BaseMsg.STATUSES.Failed, "email or password incorrect");
    }
  } catch (err) {
    console.log("err", err);
    res.json(err);
  }
});
///////////////////////////////////////
// before adding isAdmin from DB
// router.post(`/login`, async (req, res) => {
//   try {
//     const userEmail = await usersModel.selectUserByMail(req.body.email);
//     if (userEmail[0].length === 0) {
//       throw new BaseMsg(BaseMsg.STATUSES.Failed, "email or password incorrect");
//     }
//     const comparePassword = await bcrypt.compareHashedPassword(
//       req.body.password,
//       userEmail[0][0].password
//     );

//     if (comparePassword) {
//       const token = await jwt.createToken(req.body.email);
//       console.log("token", token);
//       throw new BaseMsg(BaseMsg.STATUSES.Success, token);
//     }
//     if (!comparePassword) {
//       throw new BaseMsg(BaseMsg.STATUSES.Failed, "email or password incorrect");
//     }
//   } catch (err) {
//     console.log("err", err);
//     res.json(err);
//   }
// });

///////////////////////////////////////
// until  before adding isAdmin from DB

module.exports = router;
