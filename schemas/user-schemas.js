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

  if (this.cart?.products?.some((product) => product.quantitiesInCart <= 0)) {
    const itemToDelete = this.cart?.products?.find(
      (product) => product.quantitiesInCart === 0
    );
    this.cart.products = this.cart?.products?.filter(
      (pr) => pr._id !== itemToDelete._id
    );
  }
  next();
});

module.exports = { UserSchema };
