const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const controllerUser = require("../controllers/user.js");
const { redirectUrl, isLoggedin } = require("../middleware.js");

router.get("/signup", controllerUser.getSignupForm);

router.post("/signup", wrapAsync(controllerUser.signupSubmit));

router.get("/login", controllerUser.getLoginForm);

router.post(
  "/login",
  redirectUrl,
  passport.authenticate("local", {
    failureRedirect: "login",
    failureFlash: true,
  }),
  controllerUser.loginSubmit
);

router.get("/logout", controllerUser.logout);

module.exports = router;
