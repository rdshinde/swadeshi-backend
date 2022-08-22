const express = require("express");
const sign = require("jwt-encode");
const unsign = require("jwt-decode");
const { v4: uuid } = require("uuid");

const wishlistV1 = express.Router();

const { User } = require("../models/user.models");
const { authVerify } = require("../middlewares/auth.middleware");

wishlistV1
  .route("/")
  .get(authVerify, async (req, res) => {
    try {
      const { userId } = req.user;
      const user = await User.findById(userId);
      if (user) {
        const userWishlist = user.wishlist;
        res.json({ success: true, wishlist: userWishlist });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Unable to get wishlisted products.",
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
        user.wishlist.products.push({
          ...product,
          isWishlisted: true,
        });
        const updatedUser = await user.save();
        res.json({ success: true, wishlist: updatedUser.wishlist });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Unable to wishlist product.",
        errorMessage: err.message,
      });
    }
  });

wishlistV1.route("/:id").delete(authVerify, async (req, res) => {
  try {
    const { userId } = req.user;
    const { id } = req.params;
    const user = await User.findById(userId);
    if (user) {
      await User.updateOne(
        { _id: userId },
        {
          $pull: { "wishlist.products": { _id: id } },
        },
        { new: true }
      );
      const updatedUser = await User.findById(userId);
      await updatedUser.save();
      res.json({ success: true, wishlist: updatedUser.wishlist });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unable to delete wishlisted product.",
      errorMessage: err.message,
    });
  }
});

module.exports = { wishlistV1 };
