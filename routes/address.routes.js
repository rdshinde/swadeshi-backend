const express = require("express");
const sign = require("jwt-encode");
const unsign = require("jwt-decode");
const { v4: uuid } = require("uuid");

const addressV1 = express.Router();

const { User } = require("../models/user.models");
const { authVerify } = require("../middlewares/auth.middleware");

addressV1
  .route("/")
  .get(authVerify, async (req, res) => {
    try {
      const { userId } = req.user;
      const user = await User.findById(userId);
      if (user) {
        const userAddresses = user.address;
        res.status(200).json({ success: true, address: userAddresses });
      } else {
        res.status(404).json({ success: false, address: [] });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Unable to get user address.",
        errorMessage: err.message,
      });
    }
  })
  .post(authVerify, async (req, res) => {
    try {
      const { userId } = req.user;
      const address = req.body;
      const user = await User.findById(userId);
      if (user) {
        user.address.push({ ...address, _id: uuid() });
        const updatedUser = await user.save();
        res.status(201).json({ success: true, address: updatedUser.address });
      } else {
        res.status(404).json({ success: false, address: [] });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Unable to add address.",
        errorMessage: err.message,
      });
    }
  });

addressV1
  .route("/:id")
  .post(authVerify, async (req, res) => {
    try {
      const { userId } = req.user;
      const { id } = req.params;
      const { address } = req.body;
      const user = await User.findById(userId);
      if (user) {
        await User.updateOne(
          { _id: userId, "address._id": id },
          {
            $set: { "address.$.address": address },
          },
          { new: true }
        );
        const updatedUser = await User.findById(userId);
        await updatedUser.save();
        res.status(201).json({ success: true, address: updatedUser.address });
      } else {
        res.status(404).json({ success: false, address: [] });
      }
    } catch (err) {
      res.status(500).json({
        success: true,
        message: "Unable to update address.",
        errorMessage: err.message,
      });
    }
  })
  .delete(authVerify, async (req, res) => {
    try {
      const { userId } = req.user;
      const { id } = req.params;
      const user = await User.findById(userId);
      if (user) {
        await User.updateOne(
          { _id: userId },
          {
            $pull: { address: { _id: id } },
          },
          { new: true }
        );
        const updatedUser = await User.findById(userId);
        await updatedUser.save();
        res.status(200).json({ success: true, address: updatedUser.address });
      } else {
        res.status(404).json({ success: false, address: [] });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Unable to delete address.",
        errorMessage: err.message,
      });
    }
  });

module.exports = { addressV1 };
