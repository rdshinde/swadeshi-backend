const express = require("express");
const sign = require("jwt-encode");
const unsign = require("jwt-decode");
const { v4: uuid } = require("uuid");

const cartV1 = express.Router();

const { User } = require("../models/user.models");
const { authVerify } = require("../middlewares/auth.middleware");

cartV1
  .route("/")
  .get(authVerify, async (req, res) => {
    try {
      const { userId } = req.user;
      const user = await User.findById(userId);
      if (user) {
        const userCart = user.cart;
        res.json({ success: true, cart: userCart });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "unable to get products",
        errorMessage: err.message,
      });
    }
  })
  .post(authVerify, async (req, res) => {
    try {
      const { userId } = req.user;
      const product = req.body;
      const user = await User.findById(userId);
      if (user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: userId },
          { cart: { products: product } },
          {
            returnOriginal: false,
          }
        );
        res.json({ success: true, cart: updatedUser.cart });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "unable to get products",
        errorMessage: err.message,
      });
    }
  });

module.exports = { cartV1 };
