const User = require("../models/user.model");

exports.getAllUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
};

exports.createUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({
      message: "User already exists",
    });
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  res.status(201).json({
    message: "User created successfully",
    user,
  });
};
