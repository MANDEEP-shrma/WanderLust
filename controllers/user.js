const User = require("../models/user");

module.exports.getSignupForm = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.signupSubmit = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    let newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) => {
      if (err) {
        console.log(err.message);
        return next();
      }
      req.flash("success", "Welcome to WanderLust!");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

module.exports.getLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.loginSubmit = (req, res) => {
  req.flash("success", "Welcome back!, to wanderlust you are logged in ");
  let url = res.locals.redirectUrl || "/listings";
  res.redirect(url);
};

module.exports.logout = (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You are logged out!");
    res.redirect("/listings");
  });
};
