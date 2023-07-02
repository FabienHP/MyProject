const express = require('express');
const router = express.Router();
const User = require('../database/models/user.model');

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    const newUser = await User.create({ email, password });
    res.status(200).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    if (error.errors && error.errors[0].message === 'Email already exists') {
      return res.status(400).json({ message: "Email already exists" });
    }
    res.status(500).json({ message: "Error creating user", error });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user || !(await user.isValidPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
});

module.exports = router;
