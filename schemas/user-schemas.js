const mongoose = require("mongoose");
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

  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

UserSchema.pre("save", function (next) {
  this.cart.qty = this.cart.products.length;
  this.wishlist.qty = this.wishlist.products.length;
  this.updatedAt = Date.now();
  next();
});
UserSchema.post("updateOne", function () {
  this.set({ "cart.qty": this.cart?.products.length });
  this.set({ "this.updatedAt": Date.now() });
});

module.exports = { UserSchema };
