const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const router = require("./src/routes/authRoutes");
// const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const app = express();

const allowedOrigins = ["http://localhost:5713", "http://localhost:5173"];
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));
// app.use(cookieParser());
app.use(express.json());
app.use("/api", router);
mongoose
  .connect(
    'mongodb+srv://user:123@cluster0.1zlgf5a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
  )
  .then(() => {
    app.listen(5000);
    console.log("Database is connected! Listening to localhost 5000");
  })
  .catch((err) => console.log(err));