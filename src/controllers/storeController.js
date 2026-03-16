import {
  getAllStores,
  getStoreByUserId,
  updateStore
} from "../models/storeModel.js";

export const getStores = async (req, res) => {
  try {
    const stores = await getAllStores();
    res.json(stores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyStore = async (req, res) => {
  try {
    const { userId } = req.params;
    const store = await getStoreByUserId(userId);

    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    res.json(store);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const toggleStoreStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { isOpen } = req.body;

    const updatedStore = await updateStore(id, { isOpen });

    if (!updatedStore) {
      return res.status(404).json({ message: "Store not found" });
    }

    res.json(updatedStore);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};