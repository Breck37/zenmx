const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WeeklyPick = new Schema(
  {
    week: { type: Number, default: null },
    year: { type: String, default: new Date().getFullYear() },
    user: { type: String, default: null },
    smallBikePicks: [
      {
        _id: false,
        riderName: { type: String, default: null },
        position: { type: Number, default: null },
        points: { type: Number, default: null },
      },
    ],
    bigBikePicks: [
      {
        _id: false,
        riderName: { type: String, default: null },
        position: { type: Number, default: null },
        points: { type: Number, default: null },
      },
    ],
    totalPoints: { type: Number, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("picks", WeeklyPick);
