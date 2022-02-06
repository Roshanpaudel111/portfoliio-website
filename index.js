//All dependencies here.....
const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const path = require("path");

//App initialization
const app = express();

//mongoose connection here

mongoose
  .connect("mongodb://127.0.0.1:27017/portfolio")
  .then(() => {
    console.log("Connection Established Successfully");
  })
  .catch((e) => {
    console.log(e);
  });

//Setting up view enjine as ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//All middlewares here
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

//All routes here
app.get("/", (req, res) => {
  res.render("index");
});

//App is listening to http://localhost:3000/
app.listen(3000, () => {
  console.log("Listening to port 3000");
});
