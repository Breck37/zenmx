const mongoose = require(mongoose);
const Schema = mongoos.Schema;

const League = new Schema({
  leagueId: String,
  leagueName: String,
  users: [String],
  settings: {
    types: [String],
    scoring: String,
  }
});

module.exports = mongoose.model("leagues", League);
