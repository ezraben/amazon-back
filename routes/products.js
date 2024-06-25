const express = require("express");
const router = express.Router();
const productsModel = require("../models/productsModel");
// const usersModel = require("../models/usersModel");

const productValidation = require("../validation/productValidation");
const BaseMsg = require("../classes/baseMsg");
const { object, array } = require("joi");

router.post("/addProduct", async (req, res) => {
  try {
    const validatedValue = await productValidation.validateAddProductSchema(
      req.body
    );
    console.log("validatedValue", validatedValue);
    if (validatedValue._original) {
      // this means error in the validation
      res.json(validatedValue);
    }

    if (validatedValue) {
      const product = await productsModel.addProduct([
        validatedValue.productName,
        validatedValue.productPrice,
        validatedValue.category,
        validatedValue.productCreator,
      ]);
      if (product) {
        res.json(new BaseMsg(BaseMsg.STATUSES.Success, "new product added"));
      }
    }
  } catch (err) {
    res.status("err", err);
  }
});

router.get(`/getAllProducts`, async (req, res) => {
  try {
    const allProducts = await productsModel.getAllProducts();
    res.json(allProducts[0]);
  } catch (err) {
    console.log("err", err);
  }
});
router.get(`/findProductById`, async (req, res) => {
  try {
    const id = req.query.id;
    const productById = await productsModel.findProductById(id);
    res.json(productById[0][0]);
  } catch (err) {
    console.log("err", err);
  }
});
router.get(`/getProductsByMultipleIds`, async (req, res) => {
  try {
    // let firstArr = [];
    const id = req.query.id;
    let arrOfIds = [];
    console.log("typeof(id)", typeof id);
    if (typeof id === "string") {
      const productsByIds = await productsModel.findProductByMultipleIds(id);
      arrOfIds.push(productsByIds[0][0]);
    }

    // firstArr.push(id);
    // console.log("firstArr", firstArr);
    console.log("id", id);
    if (typeof id !== "string") {
      for (let x = 0; x < id.length; x++) {
        const productsByIds = await productsModel.findProductByMultipleIds(
          id[x]
        );
        arrOfIds.push(productsByIds[0][0]);
      }
    }

    console.log("arrOfIds", arrOfIds);
    res.json(arrOfIds);
  } catch (err) {
    console.log("err", err);
    res.json(err);
  }
});

// router.get(`/productByName`, async (req, res) => {
//   try {
//     const
//   } catch (err) {
//     console.log("err", err);
//     res.json(err);
//   }
// });
////////////////////////////////////////
// works!!! only prob is when only one id not works, it uses this id for the loop  and gets undifind
// router.get(`/getProductsByMultipleIds`, async (req, res) => {
//   try {
//     const id = req.query.id;
//     console.log("id", id);
//     let arrOfIds = [];

//     for (let x = 0; x < id.length; x++) {
//       const productsByIds = await productsModel.findProductByMultipleIds(id[x]);
//       arrOfIds.push(productsByIds[0][0]);
//     }
//     console.log("arrOfIds", arrOfIds);
//     res.json(arrOfIds);

//   } catch (err) {
//     console.log("err", err);
//     res.json(err);
//   }
// });

////////////////////////////////////////
//  until here works!!! only prob is when only one id not works, it uses this id for the loop  and gets undifind

router.get(`/getProductsByCategory`, async (req, res) => {
  try {
    const category = req.query.category;
    const products = await productsModel.getProductsByCategory(category);
    if (products[0].length === 0) {
      res.json(new BaseMsg(BaseMsg.STATUSES.Failed, "no product was found"));
    }
    if (products[0].length > 0) {
      res.json(products[0]);
    }
  } catch (err) {
    console.log("err", err);
    res.json(err);
  }
});

router.get("/getProductByCreator", async (req, res) => {
  try {
    const userEmail = req.query.userEmail;
    const products = await productsModel.productsByCreator(userEmail);

    res.json(products[0]);
  } catch (err) {
    console.log("err", err);
    res.json("err", err);
  }
});
router.get("/getProductByProductName", async (req, res) => {
  try {
    const productName = req.query.productName;
    const products = await productsModel.findProductByName(productName);
    // res.json(productName);
    console.log("productName", productName);

    res.json(products[0]);
  } catch (err) {
    console.log("err", err);
    res.json("err", err);
  }
});

router.patch(`/editProduct`, async (req, res) => {
  try {
    const dataToEdit = req.query;
    const validatedValue = await productValidation.validateEditProductSchema(
      dataToEdit
    );
    if (validatedValue._original) {
      //this means there is error i  the validation
      console.log("error oin validation", validatedValue.details);
      res.json(validatedValue.details);
    }
    if (!validatedValue._original) {
      // this means there is no error in joi validation
      const productById = await productsModel.editProductById(dataToEdit);

      console.log(productById);
      res.json(
        new BaseMsg(BaseMsg.STATUSES.Success, "product has been edited ")
      );
    }
  } catch (err) {
    console.log("err", err);
    res.json(err);
  }
});

router.delete(`/deleteProduct`, async (req, res) => {
  try {
    const id = req.query.id;
    const productToDelete = await productsModel.deleteProductById(id);

    if (productToDelete[0].affectedRows === 0) {
      res.json(new BaseMsg(BaseMsg.STATUSES.Failed, "something went wrong"));
    }
    if (productToDelete[0].affectedRows === 1) {
      res.json(
        new BaseMsg(BaseMsg.STATUSES.Success, "product deleted successfully")
      );
    }
  } catch (err) {
    console.log("err", err);
    res.json(err);
  }
});

module.exports = router;
