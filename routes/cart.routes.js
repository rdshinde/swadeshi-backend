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
        message: "Unable to get cart products.",
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
        user.cart.products.push({
          ...product,
          isAddedToCart: true,
          quantitiesInCart: 1,
        });
        const updatedUser = await user.save();
        res.status(201).json({ success: true, cart: updatedUser.cart });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Unable to add product.",
        errorMessage: err.message,
      });
    }
  });

cartV1
  .route("/:id")
  .delete(authVerify, async (req, res) => {
    try {
      const { userId } = req.user;
      const { id } = req.params;
      const user = await User.findById(userId);
      if (user) {
        await User.updateOne(
          { _id: userId },
          {
            $pull: { "cart.products": { _id: id } },
          },
          { new: true }
        );
        const updatedUser = await User.findById(userId);
        await updatedUser.save();
        res.json({ success: true, cart: updatedUser.cart });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Unable to delete cart product.",
        errorMessage: err.message,
      });
    }
  })
  .post(authVerify, async (req, res) => {
    try {
      const { userId } = req.user;
      const { id } = req.params;
      const user = await User.findById(userId);
      const actionType = req.body.action.type;
      if (user) {
        if (actionType === "increment") {
          await User.updateOne(
            { _id: userId, "cart.products._id": id },
            {
              $inc: {
                "cart.products.$.quantitiesInCart": 1,
              },
            },
            { new: true }
          );
        } else if (actionType === "decrement") {
          await User.updateOne(
            { _id: userId, "cart.products._id": id },
            {
              $inc: {
                "cart.products.$.quantitiesInCart": -1,
              },
            },
            { new: true }
          );
        }
        const updatedUser = await User.findById(userId);
        await updatedUser.save();
        res.json({ success: true, cart: updatedUser.cart });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Unable to delete cart product.",
        errorMessage: err.message,
      });
    }
  });

module.exports = { cartV1 };
