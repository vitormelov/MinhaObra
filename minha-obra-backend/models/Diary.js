// models/Diary.js
const mongoose = require('mongoose');

const DiarySchema = new mongoose.Schema({
  date: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  employees: [
    {
      quantity: { type: Number },
      role: { type: String },
      company: { type: String }
    }
  ],
  morningWeather: { type: String, required: true },
  afternoonWeather: { type: String, required: true },
  activities: [{ type: String }],
  materials: [{ type: String }],
  occurrences: [{ type: String }],
});

module.exports = mongoose.model('Diary', DiarySchema);
