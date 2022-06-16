// MongoDB REST API - Created by https://www.github.com/michaelsimmonsio | www.michaelsimmons.io

// Initalizes Express & Mongoose and imports them.

const express = require('express');
const mongoose = require('mongoose');


// Creates the "app" constant. 
// "app" can be used to reference the main program. For example, app.listen(3000) will start the app on a specific port of 3000.

const app = express();

// Makes the app use express.json 
// Express.json is the built-in middleware function for ExpressJS. 
// This parses incoming JSON data into usable data.

app.use(express.json());

// Starts the app on port 3000
// Prints out a success message.

app.listen(3000, () => {
    console.log(`Success: Server started on port ${3000}`)
})

// Imports the .env file containing the MongoDB URI.
// .env files are a good way to store constant environment data, like URIs, passwords, tokens, etc.
// This is not necessary, and you can just replace "process.env.MONGODB_URI" with your MongoDB URI


require('dotenv').config();

const mongoString = process.env.MONGODB_URI;

// Connects to the MongoDB database using the URI string from above.
mongoose.connect(mongoString);

// Allows "database" to be used to reference the MongoDB connection
const database = mongoose.connection

// If a database error occurs, this prints it to the console log.
database.on('error', (error) => {
    console.log(error)
})

// If the database connects successfully, it will print out a message once.
database.once('connected', () => {
    console.log('Success: Database connected.');
})

// Imports the route .js files
// Routes are where you direct your requests, for example, the page localhost/profile/get/:<id> is a route. localhost/profile/getAll is another route.
// It's self explainatory once you read through the route files.

const profiles = require('./routes/profiles')
const auth = require('./routes/auth.js')

// This assigns a directory/link for each route file. All routes in the "profiles.js" file will be under "/profile" when creating requests.

app.use('/profile', profiles)
app.use('/auth', auth)
