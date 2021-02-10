const User = require("../models/users.model");
const db = require("../db");

module.exports = {
  createUser: (req, res) => {
    const { body } = req;

    if (!body) {
      return res.status(400).json({
        success: false,
        error: "No user to create",
      });
    }

    const user = new User(body);

    if (!user) {
      return res.status(400).json({ success: false, error: "No model" });
    }

    user
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: user._id,
          message: "User saved successfully!",
        });
      })
      .catch((error) => {
        return res.status(400).json({
          error,
          message: "User not created!",
        });
      });
  },
  getUser: async (req, res) => {
    const { email } = req.params;
    console.log({ email, query: req.query, param: req.params });

    const user = await User.findOne({ email });

    if (!user || (Array.isArray(user) && !user.length)) {
      this.createUser();
      res.status(200).json({ success: false, email });
      return;
    }
    res.status(200).json({ success: true, user });
    return;
  },
};
