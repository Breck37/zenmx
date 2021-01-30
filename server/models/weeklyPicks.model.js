const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WeeklyPick = new Schema(
  {
    week: { type: Number },
    year: { type: String },
    user: { type: String },
    smallBikePicks: [
      {
        _id: false,
        riderName: String,
        position: Number,
        points: { type: Number, default: null },
      },
    ],
    bigBikePicks: [
      {
        _id: false,
        riderName: String,
        position: Number,
        points: { type: Number, default: null },
      },
    ],
    totalPoints: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("picks", WeeklyPick);
