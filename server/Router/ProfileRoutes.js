const express = require("express");
const path = require('path');
const UserModel = require(path.join('../models/users'));
const router = express.Router();

// Get user profile by ID
router.get('/profile/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
