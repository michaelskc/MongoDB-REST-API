const mongoose = require('mongoose');



const dataSchema = new mongoose.Schema({
    _id: String,
    username: String,
    rank: String
  }, { _id: false });



module.exports = mongoose.model('Profile', dataSchema)