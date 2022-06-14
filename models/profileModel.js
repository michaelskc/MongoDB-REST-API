// Imports Mongoose
const mongoose = require('mongoose');

// This is the data schema / data model that will be used for all requests directed at the "profiles.js" route.
// There are three data types specified: _id, username, and rank. _id is required, but username and rank are not.

// The reason _id is required is because we are specifying the ID ourselves, insteading of letting Mongoose automatically create one.
// This is done by adding { _id: false} at the end of the data schema.

// Because of this, all requests need to include a _id string. This was renamed to "UUID", so requests will need to have UUID: "string" in their body.
// _id was renamed to "UUID" on line 42 of profiles.js: "_id: req.body.uuid,"
// This line of code tells the program that the "_id:" value that's needed in the data schema will come from the request's body with the name "UUID".

// Your incoming requests MUST include a UUID, but do not need to include anything else. You CANNOT add new variables - you must specify them here first.
// For example, if you wanted to add "age" to each MongoDB document, you need to add "age: Number" here.

const dataSchema = new mongoose.Schema({
    _id: String,
    username: String,
    rank: String
  }, { _id: false });


// Uses this model for "Profile"
module.exports = mongoose.model('Profile', dataSchema)
