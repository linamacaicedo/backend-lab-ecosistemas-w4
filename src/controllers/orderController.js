import { createOrder, getAllOrders, getOrderById, updateOrder } from "../models/orderModel.js";

export const createNewOrder = (req, res) => {
  const { consumerId, productId, quantity } = req.body;

  if (!consumerId || !productId || !quantity) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const newOrder = {
    id: Date.now(),
    consumerId,
    productId,
    quantity,
    status: "pending"
  };

  createOrder(newOrder);

  res.status(201).json(newOrder);
};

export const getOrders = (req, res) => {
  const orders = getAllOrders();
  res.json(orders);
};

export const acceptOrder = (req, res) => {
  const { orderId, deliveryId } = req.body;

  const order = getOrderById(orderId);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  order.status = "accepted";
  order.deliveryId = deliveryId;

  updateOrder(order);

  res.json(order);
};