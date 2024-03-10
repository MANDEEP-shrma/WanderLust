const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const controllerListing = require("../controllers/listing.js");
const Listing = require("../models/listing.js");
const { storage } = require("../cloudConfig.js");
const multer = require("multer");
const upload = multer({ storage });
const { isLoggedin, isOwner, validateListings } = require("../middleware.js");

//index route
router.get("/", wrapAsync(controllerListing.index));

//New route

router.get("/new", isLoggedin, controllerListing.renderNewForm);

//show route

router.get("/:id", wrapAsync(controllerListing.show));

//Create route

router.post(
  "/",
  isLoggedin,
  upload.single("listing[image]"),
  validateListings,
  wrapAsync(controllerListing.createNew)
);

// Edit form route

router.get(
  "/:id/edit",
  isLoggedin,
  isOwner,
  wrapAsync(controllerListing.renderEditForm)
);

//Updating route

router.put(
  "/:id",
  isLoggedin,
  isOwner,
  upload.single("listing[image]"),
  validateListings,
  wrapAsync(controllerListing.update)
);

//Delete button

router.delete("/:id", isLoggedin, isOwner, wrapAsync(controllerListing.delete));

module.exports = router;

/** Here by writing these code in this format make it more suitabble and reliable
 * we cleared the /listing from all request of the backend code because we declared it as our home for particluaar these folder in app.js
 * */
