const Listing = require("../models/listing");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const axios = require('axios')


module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.show = async (req, res) => {
  let { id } = req.params;
  const showDetails = await Listing.findById(id)
    .populate({ path: "review", populate: { path: "author" } })
    .populate("owner");
  if (!showDetails) {
    req.flash("error", "Listing not found!");
    res.redirect("/listings");
  }
  res.render("listings/show.ejs", { showDetails });
};

// module.exports.createNew = async (req, res, next) => {
//   let response = await geocodingClient
//     .forwardGeocode({
//       query: req.body.listing.location,
//       limit: 1,
//     })
//     .send();

//   let url = req.file.path;
//   let filename = req.file.filename;

//   const newListing = new Listing(req.body.listing);
//   newListing.owner = req.user._id;
//   newListing.image = { url, filename };
//   newListing.geometry = response.body.features[0].geometry;
//   let savedListing = await newListing.save();
//   console.log(savedListing);
//   req.flash("success", "New Listing is added");
//   res.redirect("/listings");
// };


module.exports.createNew = async (req, res, next) => {
  try {
    const locationQuery = req.body.listing.location;
    const nominatimURL = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(locationQuery)}&format=json&limit=1`;

    const response = await axios.get(nominatimURL);
    const geoData = response.data;

    if (!geoData.length) {
      req.flash("error", "Invalid location provided.");
      return res.redirect("/listings/new");
    }

    let url = req.file.path;
    let filename = req.file.filename;

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    newListing.geometry = {
      type: "Point",
      coordinates: [parseFloat(geoData[0].lon), parseFloat(geoData[0].lat)],
    };

    let savedListing = await newListing.save();
    console.log(savedListing);

    req.flash("success", "New Listing is added");
    res.redirect("/listings");

  } catch (err) {
    console.error("Nominatim Geocoding Error:", err.message);
    req.flash("error", "Geocoding failed. Please check the location input.");
    res.redirect("/listings/new");
  }
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing not found!");
    res.redirect("/listings");
  }
  let originalImgUrl = listing.image.url;
  originalImgUrl = originalImgUrl.replace(
    "/upload",
    "/upload/h_150,w_200,e_blur:100"
  );
  res.render("listings/edit.ejs", { listing, originalImgUrl });
};

// module.exports.update = async (req, res) => {
//   let { id } = req.params;
//   let { ...editListing } = req.body.listing;
//   let updatedListing = await Listing.findByIdAndUpdate(id, { ...editListing });

//   if (typeof req.file !== "undefined") {
//     let url = req.file.path;
//     let filename = req.file.filename;
//     updatedListing.image = { url, filename };
//     await updatedListing.save();
//   }
//   req.flash("success", "Your,Listing is Updated!");
//   res.redirect(`/listings/${id}`);
// };

module.exports.update = async (req, res) => {
  let { id } = req.params;
  let { location, ...editListing } = req.body.listing; // Extract location separately

  let updatedListing = await Listing.findByIdAndUpdate(id, { ...editListing });

  // 🔹 If location is changed, get new coordinates from Nominatim
  if (location) {
    try {
      let geoData = await axios.get(`https://nominatim.openstreetmap.org/search`, {
        params: {
          q: location,
          format: "json",
          limit: 1,
        },
      });

      if (geoData.data.length > 0) {
        let { lat, lon } = geoData.data[0];
        updatedListing.geometry = {
          type: "Point",
          coordinates: [parseFloat(lon), parseFloat(lat)], // Store as [lng, lat] for GeoJSON
        };
      }
    } catch (error) {
      console.error("Error fetching coordinates from Nominatim:", error);
    }
  }

  // 🔹 Handle image update
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    updatedListing.image = { url, filename };
  }

  await updatedListing.save();

  req.flash("success", "Your Listing is Updated!");
  res.redirect(`/listings/${id}`);
};

module.exports.delete = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Your,Listing is deleted!");
  res.redirect("/listings");
};
