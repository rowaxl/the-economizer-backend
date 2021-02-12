const mongoose = require('mongoose');
const { Schema } = mongoose; //const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: String,
  name: String,
  image: String,
})

module.exports = mongoose.model('Users', userSchema)