import { createProduct, getAllProducts } from "../models/productModel.js";

export const createNewProduct = (req, res) => {
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

  createProduct(newProduct);

  res.status(201).json(newProduct);
};

export const getProducts = (req, res) => {
  const products = getAllProducts();
  res.json(products);
};