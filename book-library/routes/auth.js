/**
 * User Authentication
 */

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// User Registration - website'/register'
router.post("/register", async (req, res) => {
  try {
    // Data sent by client to server
    // Destructuring to extract these properties and assigns them to variables
    const { username, email, password } = req.body;
    // Check if user is already in db
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Generates salt to be combined with password before hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update user with new hashed password
    user = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save new user info with the hashed password above
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err.message);
    // Sets HTTP status to 500 & sends str 'Server Error' as response body
    res.status(500).send("Server Error");
  }
});

// User Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  try {
    // Looking if user exists in db by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // Comparing password received to hashed password in db
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    // Payload for token - consists of user id (claim)
    const payload = {
      user: {
        id: user.id,
      },
    };

    // Token signature
    // Encoded payload & secret are wrapped - sent back to client & valid for 1h
    // If error occurs, will be passed in err
    jwt.sign(
      payload,
      "f310805a97f03af69ed62936639e680a1b2b838dff0157f9e1cd4ba38479e4df",
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        // Sends JSON obj to client to be used
        res.json({ token });
      }
    );
    // Catch error and log error to console
  } catch (err) {
    console.error(err.message);
    // Sets HTTP status & sends str as response body
    res.status(500).send("Server Error");
  }
});

module.exports = router;
