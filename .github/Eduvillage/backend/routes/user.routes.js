const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const {
  registerUser,
  loginUser
} = require("../controllers/user.controller");

router.delete("/delete-test-user", async (req, res) => {
  try {
    await User.deleteOne({ email: "student@test.com" });
    res.json({ message: "Test user deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
