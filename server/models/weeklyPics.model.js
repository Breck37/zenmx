const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const weeklyPick = new Schema(
  {
    week: { type: Number },
    user: { type: String },
    smallBikePicks: [
      {
        riderName: String,
        position: Number,
      },
    ],
    bigBikePicks: [
      {
        riderName: String,
        position: Number,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("picks", weeklyPick);
