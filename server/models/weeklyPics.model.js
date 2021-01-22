const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const weeklyPick = new Schema(
  {
    week: { type: Number, required: true },
    picks: [
      {
        riderName: String,
        position: Number,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("weeklyPicks", weeklyPick);
