const mongoose = require("mongoose");
const { saveUserDoc } = require("../middlewares/saveUserDoc.middleware");

const { Schema } = mongoose;
const { productSchema } = require("./products-schemas");
const UserSchema = new Schema({
  _id: { type: String, required: true },
  firstName: String,
  lastName: String,
  email: { type: String, required: true },
  password: { type: String, required: true },

  cart: {
    products: [productSchema],
    qty: {
      type: Number,
      default: 0,
    },
  },
  wishlist: {
    products: [productSchema],
    qty: {
      type: Number,
      default: 0,
    },
  },
  address: [
    {
      _id: { type: String, required: true },
    },
  ],
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

UserSchema.pre("save", saveUserDoc);

module.exports = { UserSchema };
