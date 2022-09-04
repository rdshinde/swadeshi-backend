const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  _id: { type: Number, required: true },
  name: String,
  make: String,
  imageUrl: String,
  description: String,
  originalPrice: String,
  discountedPrice: String,
  rating: String,
  totalRatings: String,
  isAvailable: { type: Boolean, default: true },
  isWishlisted: { type: Boolean, default: false },
  isAddedToCart: { type: Boolean, default: false },
  isFastDelivery: { type: Boolean, default: false },
  availableSize: {
    type: [String],
    default: ["XS", "S", "L", "XL", "XXL", "3XL"],
  },
  categoryName: String,
  quantitiesInCart: {
    type: Number,
    default: 0,
    min: [0, "Items quantity cannot be negative!"],
  },
  count: { type: Number, default: 10 },
});

module.exports = { productSchema };
