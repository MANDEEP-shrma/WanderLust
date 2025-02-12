# WanderLust

WanderLust is a web application that allows users to explore, create, and manage listings for vacation rentals. Users can sign up, log in, and leave reviews for listings. The application uses Node.js, Express, MongoDB, and various other technologies to provide a seamless experience.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Folder Structure](#folder-structure)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Dependencies](#dependencies)
- [License](#license)

## Installation

Clone the repository:
```bash
git clone https://github.com/yourusername/wanderlust.git
cd wanderlust
```

Install dependencies:
```bash
npm install
```

Set up environment variables: Create a `.env` file in the root directory and add the following variables:
```
ATLAS_DB_URL=your_mongodb_connection_string
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
SECRET=your_session_secret
```

Initialize the database with sample data:
```bash
node initialise/index.js
```

## Usage

Start the server:
```bash
npm start
```

Open your browser and navigate to `http://localhost:8080`.

## Features

- User authentication (sign up, log in, log out)
- Create, read, update, and delete listings
- Leave reviews for listings
- View listings on a map
- Flash messages for success and error notifications

## Folder Structure

```
WanderLust/
├── .env
├── .gitignore
├── app.js
├── cloudConfig.js
├── controllers/
│   ├── listing.js
│   ├── review.js
│   ├── user.js
├── initialise/
│   ├── data.js
│   ├── index.js
├── middleware.js
├── models/
│   ├── listing.js
│   ├── review.js
│   ├── user.js
├── package.json
├── public/
│   ├── CSS/
│   │   ├── rating.css
│   │   ├── style.css
│   ├── JS/
│   │   ├── map.js
│   │   ├── script.js
├── routes/
│   ├── listing.js
│   ├── review.js
│   ├── users.js
├── schema.joi.js
├── utils/
│   ├── ExpressError.js
│   ├── wrapAsync.js
├── views/
│   ├── dashboard.ejs
│   ├── error.ejs
│   ├── includes/
│   │   ├── flash.ejs
│   │   ├── footer.ejs
│   │   ├── navbar.ejs
│   ├── layouts/
│   │   ├── boilerplate.ejs
│   ├── listings/
│   │   ├── edit.ejs
│   │   ├── index.ejs
│   │   ├── new.ejs
│   │   ├── show.ejs
│   ├── users/
│   │   ├── login.ejs
│   │   ├── signup.ejs
```

## Environment Variables

- `ATLAS_DB_URL`: MongoDB connection string
- `CLOUD_NAME`: Cloudinary cloud name
- `CLOUD_API_KEY`: Cloudinary API key
- `CLOUD_API_SECRET`: Cloudinary API secret
- `SECRET`: Session secret

## Scripts

- `npm start`: Start the server
- `node initialise/index.js`: Initialize the database with sample data

## Dependencies

- `axios`: Promise-based HTTP client
- `cloudinary`: Cloudinary SDK
- `connect-flash`: Flash messages for Express
- `connect-mongo`: MongoDB session store for Express
- `cookie-parser`: Parse cookies
- `dotenv`: Load environment variables from .env file
- `ejs`: Embedded JavaScript templating
- `ejs-mate`: Layout support for EJS
- `express`: Web framework for Node.js
- `express-session`: Session middleware for Express
- `joi`: Data validation library
- `method-override`: Override HTTP methods
- `mongoose`: MongoDB object modeling tool
- `multer`: Middleware for handling multipart/form-data
- `multer-storage-cloudinary`: Cloudinary storage engine for Multer
- `nodemon`: Monitor for changes in Node.js applications
- `passport`: Authentication middleware for Node.js
- `passport-local`: Local authentication strategy for Passport
- `passport-local-mongoose`: Mongoose plugin for Passport-Local

## License

This project is licensed under the MIT License.
