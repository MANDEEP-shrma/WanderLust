const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const controllerReview = require("../controllers/review.js");
const {
  isLoggedin,
  validateReview,
  isReviewAuthor,
} = require("../middleware.js");

//Review route
router.post(
  "/",
  isLoggedin,
  validateReview,
  wrapAsync(controllerReview.reviewCreate)
);

//delete review route
router.delete(
  "/:reviewId",
  isLoggedin,
  isReviewAuthor,
  wrapAsync(controllerReview.deleteReview)
);

module.exports = router;
