const express = require("express");
const router = express.Router();
const passport = require("passport");
const db = require("../models");
const Post = require("../models").Post;
const { ensureAuthenticated } = require("../helpers/auth");

// These endpoints exist after /users

router.get("/board", (req, res) => {
  Post.findAll().then(posts => {
    console.log(posts);
    res.render("board", { posts: posts });
  });
})

router.get("/signup", (req, res, next) => {
  res.render("signup");
});

router.post("/signup", (req, res) => {
  db.User.create({

    // hard coded user
    // username: "MichaelScott",
    // password: "dundermifflin"

    // dynamic user
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    password: req.body.password

  }).then(user =>{
    // confirmation + display user
    // res.status(200).json({
    //   msg: "Account created",
    //   user: user
    // });
    res.render("account_created");
  });
});

router.get("/login", (req, res) => {
  res.render("login");
})

router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/users/success",
    failureRedirect: "/users/failure"
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logOut();
  res.render("logout");
});

router.get("/success", (req, res, next) => {
  console.log(req.session);
  res.render("welcome");
  // res.send(req.session.passport);
});

router.get("/failure", (req, res) => {
  res.send("Failed to log in");
});

router.get("/create", ensureAuthenticated, (req, res) => {
  res.render("create_post");
});

router.get("/posts", ensureAuthenticated, (req, res) => {
  res.render("posts");
})

module.exports = router;
