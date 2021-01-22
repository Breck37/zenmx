const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const weeklyPick = new Schema(
  {
    week: { type: Number },
    user: { type: String },
    picks: [
      {
        riderName: String,
        position: Number,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("picks", weeklyPick);
