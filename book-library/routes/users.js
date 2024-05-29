const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth");
const Book = require("../models/Book");

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

// Search users
router.get("/search", auth, async (req, res) => {
  const { query } = req.query;
  try {
    const users = await User.find({
      $or: [
        { username: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
      ],
      privacy: "public",
    }).select("username email privacy");
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Get user's books if profile is public
router.get("/:userId/books", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user || user.privacy !== "public") {
      return res.status(403).json({ msg: "Profile is private" });
    }
    const books = await Book.find({ user: user._id });
    res.json({ books });
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
