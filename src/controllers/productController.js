import { createProduct, getAllProducts } from "../models/productModel.js";

export const createNewProduct = async (req, res) => {
  try {
    const { name, price, storeId } = req.body;

    if (!name || !price || !storeId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newProduct = {
      id: Date.now(),
      name,
      price,
      storeId
    };

    const savedProduct = await createProduct(newProduct);

    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};