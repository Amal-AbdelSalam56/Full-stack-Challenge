const express = require("express");
const cors = require("cors");
const UserRoute = require("./Routes/UserRoute");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/myshopdb");
var app = express();

app.use(express.json()); //middleware
app.use(
  cors({
    origin: "*",
    methods: "GET POST PUT PATCH DELETE ",
    allowedHeaders: "",
  })
);
app.use("/User", UserRoute);
app.use("*", function (req, res, next) {
  res.status(302).redirect("/not-found");
});

app.listen(5200, () => {
  console.log("successfully Listening");
});
module.exports = index;
