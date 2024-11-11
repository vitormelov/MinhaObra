// src/models/Work.js
const mongoose = require('mongoose');

const workSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  type: { type: String, required: true },
  startDate: { type: Date, required: true },
  duration: { type: Number, required: true },
  endDate: { type: Date, required: true },
});

module.exports = mongoose.model('Work', workSchema);
