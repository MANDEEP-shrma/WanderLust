const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

const MONGO_URL = "mongodb://127.0.0.1:27017/WanderLust";
async function main() {
  await mongoose.connect(MONGO_URL);
}

main()
  .then((res) => {
    console.log("Connection Successful");
  })
  .catch((err) => {
    console.log(err);
  });

let initDb = async () => {
  await Listing.deleteMany({});
  const listingsWithCoordinates = [];

  for (const listing of initData.data) {
    const response = await geocodingClient
      .forwardGeocode({
        query: listing.location,
        limit: 1,
      })
      .send();
    const coordinates = response.body.features[0].geometry.coordinates;

    const listingWithCoordinates = {
      ...listing,
      owner: "65e371ab9e6a0ca5477c5ab8",
      geometry: {
        type: "Point",
        coordinates: coordinates,
      },
    };

    listingsWithCoordinates.push(listingWithCoordinates);
  }
  await Listing.insertMany(listingsWithCoordinates);
  console.log("Data was inserted");
};
initDb();
