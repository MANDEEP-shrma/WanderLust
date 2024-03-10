const Listing = require("./models/listing");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema } = require("./schema.joi.js");
const { reviewSchema } = require("./schema.joi.js");
const Review = require("./models/review.js");

//Here we made a seperate middleware for the same concept of validating schema
const validateListings = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

const isLoggedin = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You must be logged in First!");
    res.redirect("/login");
  }
  next();
};

const redirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

const isOwner = async (req, res, next) => {
  let { id } = req.params;
  let { image, ...editListing } = req.body.listing || {}; // Extract image separately
  let listing = await Listing.findById(id);
  if (
    !res.locals.currUser &&
    listing.owner_id.equals(res.locals.currUser._id)
  ) {
    req.flash("error", "========ACCESS_DENIED======");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

const isReviewAuthor = async (req, res, next) => {
  let { id, reviewId } = req.params;
  let review = await Review.findById(reviewId);
  if (!review.author._id.equals(res.locals.currUser._id)) {
    req.flash("error", "========ACCESS_DENIED======");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

module.exports = {
  isLoggedin,
  redirectUrl,
  isOwner,
  validateListings,
  validateReview,
  isReviewAuthor,
};
