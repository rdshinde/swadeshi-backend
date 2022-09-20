const express = require("express");
const categoryV1 = express.Router();
const { Category } = require("../models/category.models");

categoryV1
  .route("/")
  .get(async (req, res) => {
    try {
      const categories = await Category.find({});
      res.json({ success: true, categories });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "unable to get categories",
        errorMessage: err.message,
      });
    }
  })
  .post(async (req, res) => {
    try {
      const category = req.body;
      const NewCategory = new Category(category);
      const savedCategory = await NewCategory.save();
      res.json({ success: true, category: savedCategory });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "unable to add products",
        errorMessage: err.message,
      });
    }
  });

categoryV1.route("/:id").get(async (req, res) => {
  try {
    const { id } = req?.params;
    const category = await Category.find({ _id: id });

    if (category) {
      return res.json({ category, success: true });
    }
  } catch (err) {
    res.status(404).json({
      success: false,
      message:
        "The category ID sent has no category associated with it. Check and try again",
    });
  }
});

module.exports = { categoryV1 };
