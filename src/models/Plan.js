const { Schema, model } = require('mongoose');

const PlanSchema = new Schema({
  id: String,
  title: String,
  date: String,
  records: Array,
  userID: String,
})

module.exports = model('Plans', PlanSchema)