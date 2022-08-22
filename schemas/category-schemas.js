const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
  _id: Number,
  categoryName: String,
  description: String,
});

module.exports = { categorySchema };
