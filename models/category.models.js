const mongoose = require("mongoose");

const { categorySchema } = require("../schemas/category-schemas");

const Category = mongoose.model("Category", categorySchema);

module.exports = { Category };
