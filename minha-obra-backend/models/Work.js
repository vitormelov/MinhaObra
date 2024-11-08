// src/models/Work.js
const mongoose = require('mongoose');

const workSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
});

module.exports = mongoose.model('Work', workSchema);
