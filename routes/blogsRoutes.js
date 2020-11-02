const express = require("express");
const Blog = require("../models/blog.js");

const blogRouter = express.Router();

blogRouter.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "blogs", blogs: result });
    });
});

blogRouter.post("/blogs", (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => console.log(err));
});

blogRouter.get("/blogs/create", (req, res) => {
  res.render("create", { title: "create blog" });
});

blogRouter.get("/blogs/:id", (req, res) => {
  Blog.findById(req.params.id)
    .then((result) => {
      res.render("details", { blog: result, title: "blog details" });
    })
    .catch((err) => console.log(err));
});

blogRouter.delete("/blogs/:id", (req, res) => {
  Blog.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => console.log(err));
});

module.exports = blogRouter;
