const WeeklyPick = require("../models/weeklyPicks.model");

module.exports = {
  savePicks: (req, res) => {
    const body = req.body;

    if (!body) {
      return res.status(400).json({
        success: false,
        error: "No picks to save",
      });
    }

    const picks = new WeeklyPick(body);

    if (!picks) {
      return res.status(400).json({ success: false, error: "No model" });
    }

    picks
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: picks._id,
          message: "Picks saved successfully!",
        });
      })
      .catch((error) => {
        return res.status(400).json({
          error,
          message: "Picks not created!",
        });
      });
  },
};
