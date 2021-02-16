const { Schema, model } = require('mongoose');

const PlanSchema = new Schema({
  title: String,
  start: Number,
  end: Number,
  records: {
    type: Array,
    default: []
  },
  userID: String,
  createdAt: {
    type: Number,
    default: Date.now()
  }
})

module.exports = model('Plans', PlanSchema)