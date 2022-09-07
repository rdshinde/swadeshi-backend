const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.set("json spaces", 4);
app.use(express.urlencoded({ extended: true })); // support encoded bodies

app.use(cors());

const { connectDB } = require("./db/db.connect.js");

connectDB();

const { DocsObj } = require("./utils");
const { productsV1 } = require("./routes/product.routes");
const { categoryV1 } = require("./routes/categories.routes");
const { authV1 } = require("./routes/auth.routes");
const { cartV1 } = require("./routes/cart.routes");
const { wishlistV1 } = require("./routes/wishlist.routes");
const { addressV1 } = require("./routes/address.routes");

app.use("/products", productsV1);

app.use("/categories", categoryV1);

app.use("/auth", authV1);

app.use("/user/cart", cartV1);

app.use("/user/wishlist", wishlistV1);

app.use("/user/address", addressV1);

app.get("/", (req, res) => {
  res.json({ ...DocsObj });
});

/**
 * 404 Route Handler
 * Note: DO not MOVE. This should be the last route
 */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "route not found on server, please check",
  });
});

/**
 * Error Handler
 * Don't move
 */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "error occured, see the errMessage key for more details",
    errorMessage: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
