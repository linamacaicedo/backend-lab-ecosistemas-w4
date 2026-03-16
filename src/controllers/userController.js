import { createUser, getUserByEmail } from "../models/userModel.js";

export const registerUser = (req, res) => {
  const { name, email, password, role, storeName } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const existingUser = getUserByEmail(email);

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const newUser = {
    id: Date.now(),
    name,
    email,
    password,
    role,
    storeName: role === "store" ? storeName : null
  };

  createUser(newUser);

  res.status(201).json(newUser);
};


export const loginUser = (req, res) => {
  const { email, password } = req.body;

  const user = getUserByEmail(email);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.password !== password) {
    return res.status(401).json({ message: "Invalid password" });
  }

  res.json({
    message: "Login successful",
    user
  });
};