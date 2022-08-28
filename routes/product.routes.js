const express = require("express");
const productsV1 = express.Router();
const { Product } = require("../models/product.models");

productsV1
  .route("/")
  .get(async (req, res) => {
    try {
      const products = await Product.find({});
      res.json({ success: true, products });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "unable to get products",
        errorMessage: err.message,
      });
    }
  })
  .post(async (req, res) => {
    try {
      const product = req.body;
      const NewProduct = new Product(product);
      const savedProduct = await NewProduct.save();
      res.json({ success: true, product: savedProduct });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "unable to add products",
        errorMessage: err.message,
      });
    }
  });

productsV1.route("/:id").get(async (req, res) => {
  try {
    const { id } = req?.params;
    const product = await Product.find({ _id: id });

    if (product) {
      return res.json({ product, success: true });
    }
  } catch (err) {
    res.status(404).json({
      success: false,
      message:
        "The product ID sent has no product associated with it. Check and try again",
    });
  }
});

module.exports = { productsV1 };
