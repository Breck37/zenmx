const User = require("../models/users.model");
const db = require("../db");

const createUser = ({ email }) => {
  if (!email) {
    return res.status(400).json({
      success: false,
      error: "No user to create",
    });
  }

  const baseUser = {
    email,
    currentMode: 1,
    pastResults: [],
  };

  const user = new User(baseUser);

  if (!user) {
    return { success: false, error: "No model" };
  }

  user
    .save()
    .then(() => {
      return {
        success: true,
        id: user._id,
        email,
        message: "User saved successfully!",
      };
    })
    .catch((error) => {
      return {
        error,
        message: "User not created!",
      };
    });
};

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

    const user = await User.findOne({ email });

    if (!user || (Array.isArray(user) && !user.length)) {
      const result = await createUser({ email });
      return res.status(200).json(result);
    }

    return res.status(200).json({ success: true, user });
  },
};
