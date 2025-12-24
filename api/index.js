require("dotenv").config();
const express = require("express");
const path = require("path");

const URL = require("../models/url");
const urlRoute = require("../routes/url");
const { connectToMongoDB } = require("./connnect");

const app = express();

// DB connect (safe for serverless)
connectToMongoDB(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected."))
  .catch((err) => console.error("MongoDB Error:", err));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());

app.get("/test", async (req, res) => {
  const allUrls = await URL.find({});
  return res.render("home.ejs", { urls: allUrls });
});

app.use("/url", urlRoute);

// ✅ IMPORTANT
module.exports = app;
