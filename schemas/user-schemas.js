const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  _id: String,
  firstName: String,
  lastName: String,
  email: String,
  password: String,

  cart: {
    products: [],
    qty: { type: Number, default: 0 },
  },
  wishlist: {
    products: [],
    qty: { type: Number, default: 0 },
  },

  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

module.exports = { UserSchema };
