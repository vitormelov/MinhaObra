// src/models/Diary.js
const mongoose = require('mongoose');

const diarySchema = new mongoose.Schema({
  workId: { type: mongoose.Schema.Types.ObjectId, ref: 'Work', required: true },
  date: { type: Date, required: true },
  employees: [{ quantity: Number, role: String, company: String }],
  morningWeather: String,
  afternoonWeather: String,
  activities: [String],
  materials: [String],
  occurrences: [String],
});

module.exports = mongoose.model('Diary', diarySchema);
