const mongoose = require('mongoose');



const dataSchema = new mongoose.Schema({
    token: { type: String, required: true},
    _id: { type: String },
    username: String,
    rank: String
  }, { _id: false });



module.exports = mongoose.model('Profile', dataSchema)
