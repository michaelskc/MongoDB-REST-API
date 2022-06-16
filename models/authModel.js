const mongoose = require('mongoose');


// This is the model used for authentication using JWT tokens.
// Very similar to profileModel.js


const dataSchema = new mongoose.Schema({
    _id: { type: String },
    username: String,
    password: String,
    token: String
  }, { _id: false });



module.exports = mongoose.model('Auth', dataSchema)
