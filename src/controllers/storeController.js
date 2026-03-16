import { createStore, getAllStores } from "../models/storeModel.js";

export const createNewStore = (req, res) => {
  const { name, ownerId } = req.body;

  const newStore = {
    id: Date.now(),
    name,
    ownerId,
    isOpen: true
  };

  createStore(newStore);

  res.status(201).json(newStore);
};

export const getStores = (req, res) => {
  const stores = getAllStores();
  res.json(stores);
};