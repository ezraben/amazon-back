const express = require("express");
const router = express.Router();
const usersModel = require("../models/usersModel");

router.get("/allUsers", async (req, res) => {
  try {
    const allUsers = await usersModel.getAllUsers();
    res.json(allUsers[0]);
  } catch (err) {
    res.json("err", err);
  }
});

router.delete("/removeUser", async (req, res) => {
  try {
    const userEmail = req.query.email;
    const removeUser = await usersModel.removeUser(userEmail);
    res.json(removeUser);
  } catch (err) {
    console.log("err", err);
    res.json(err);
  }
});
//////////////////
//router base
// router.get('/selectUserByEmail', async (req,res)=>{
//     try{
//         res.json('workning')

//     }
//     catch(err){
//         console.log('err',err);
//         res.json(err)

//     }
// })

module.exports = router;
