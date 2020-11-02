const express = require("express");
const mongoose = require("mongoose");
const blogRouter = require("./routes/blogsRoutes.js");

// express app
const app = express();

// connect to mongodb
const dbURI =
  "mongodb+srv://abid:blahblah12@node-practise.h1lep.mongodb.net/node-prac?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));

// setting view engine
app.set("view engine", "ejs");

// middleware and static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// listening req for home page
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

// listening req for about page
app.get("/about", (req, res) => {
  res.render("about", { title: "about" });
});

// blog route
app.use(blogRouter);

// listening req for 404 pages
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
