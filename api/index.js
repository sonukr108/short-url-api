require("dotenv").config();
const express = require("express");

const urlRoute = require("../routes/url");
const { connectToMongoDB } = require("./connnect");

const app = express();

// DB connect (safe for serverless)
connectToMongoDB(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected."))
  .catch((err) => console.error("MongoDB Error:", err));

app.use(express.json());

app.get("/", async (req, res) => {
  return res.end("Welcome in home page");
});

app.use("/url", urlRoute);

module.exports = app;
