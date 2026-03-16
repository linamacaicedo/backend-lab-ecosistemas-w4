import { createUser, getUserByEmail } from "../models/userModel.js";
import { createStore } from "../models/storeModel.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, storeName } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (role === "store" && !storeName) {
      return res.status(400).json({ message: "Store name is required for store users" });
    }

    const existingUser = await getUserByEmail(email);

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

    const savedUser = await createUser(newUser);

    if (role === "store") {
      await createStore({
        id: Date.now() + 1,
        name: storeName,
        isOpen: true,
        userId: savedUser.id
      });
    }

    res.status(201).json(savedUser);
  } catch (error) {
    console.log("REGISTER ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);

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
  } catch (error) {
    console.log("LOGIN ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};