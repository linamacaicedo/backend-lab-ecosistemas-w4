import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  getOrdersByConsumerId,
  getOrdersByStoreId,
  getAvailableOrders,
  getAcceptedOrdersByDeliveryId
} from "../models/orderModel.js";

export const createNewOrder = async (req, res) => {
  try {
    const { consumerId, storeId, productId, quantity } = req.body;

    if (!consumerId || !storeId || !productId || !quantity) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newOrder = {
      id: Date.now(),
      consumerId,
      storeId,
      productId,
      quantity,
      status: "pending",
      deliveryId: null
    };

    const savedOrder = await createOrder(newOrder);

    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await getAllOrders();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const { consumerId } = req.params;
    const orders = await getOrdersByConsumerId(consumerId);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStoreOrders = async (req, res) => {
  try {
    const { storeId } = req.params;
    const orders = await getOrdersByStoreId(storeId);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDeliveryAvailableOrders = async (req, res) => {
  try {
    const orders = await getAvailableOrders();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDeliveryAcceptedOrders = async (req, res) => {
  try {
    const { deliveryId } = req.params;
    const orders = await getAcceptedOrdersByDeliveryId(deliveryId);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSingleOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await getOrderById(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const acceptOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { deliveryId } = req.body;

    const order = await getOrderById(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (!deliveryId) {
      return res.status(400).json({ message: "deliveryId is required" });
    }

    const updatedOrder = await updateOrder(id, {
      status: "accepted",
      deliveryId
    });

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const declineOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedOrder = await updateOrder(id, {
      status: "declined"
    });

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const markOrderDelivered = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedOrder = await updateOrder(id, {
      status: "delivered"
    });

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};