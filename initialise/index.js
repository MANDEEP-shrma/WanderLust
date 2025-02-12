require('dotenv').config({ path: "../.env" });

const mongoose = require("mongoose");
const axios = require("axios");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = process.env.ATLAS_DB_URL;
if (!MONGO_URL) {
  console.error("❌ ATLAS_DB_URL is undefined. Check your .env file.");
  process.exit(1); // Stop execution
}


async function main() {
  await mongoose.connect(MONGO_URL);
}

main()
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((err) => {
    console.log(err);
  });

async function getCoordinates(location) {
  try {
    const response = await axios.get("https://nominatim.openstreetmap.org/search", {
      params: {
        q: location,
        format: "json",
        limit: 1,
      },
      headers: {
        "User-Agent": "WanderLust-App" // Required to avoid request blocking
      }
    });
    
    if (response.data.length > 0) {
      return [parseFloat(response.data[0].lon), parseFloat(response.data[0].lat)];
    } else {
      throw new Error(`Location not found: ${location}`);
    }
  } catch (error) {
    console.error(`Error fetching coordinates for ${location}:`, error.message);
    return null;
  }
}

let initDb = async () => {
  await Listing.deleteMany({});
  const listingsWithCoordinates = [];

  for (const listing of initData.data) {
    const coordinates = await getCoordinates(listing.location);
    if (!coordinates) continue; // Skip if coordinates couldn't be fetched

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
