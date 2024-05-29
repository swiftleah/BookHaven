const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth");

const router = express.Router();

// Get user profile
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Update user profile
router.put("/me", auth, async (req, res) => {
  const { privacy } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { privacy },
      { new: true }
    ).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;

