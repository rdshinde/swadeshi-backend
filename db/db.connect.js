const mongoose = require("mongoose");
require("dotenv").config();

const dbPWD = process.env.DB_PASSWORD;
const dbUser = process.env.DB_USER;

const mongoURI = `mongodb+srv://${dbUser}:${dbPWD}@cluster0.t5f55xn.mongodb.net/test`;

const connectDB = async () => {
  await mongoose
    .connect(mongoURI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => console.log("connected to db!"))
    .catch((e) => console.dir(e));
};
module.exports = { connectDB };
