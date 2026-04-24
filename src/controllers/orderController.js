import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  updateOrderPosition,
  getOrdersByConsumerId,
  getOrdersByStoreId,
  getAvailableOrders,
  getAcceptedOrdersByDeliveryId
} from "../models/orderModel.js";

export const createNewOrder = async (req, res) => {
  try {
    const { consumerId, storeId, productId, quantity, destination } = req.body;

    if (!consumerId || !storeId || !productId || !quantity || !destination) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const { lat, lng } = destination;

    if (!lat || !lng) {
      return res.status(400).json({ message: "Destination lat and lng are required" });
    }

    const newOrder = {
      id: Date.now(),
      consumerId,
      storeId,
      productId,
      quantity,
      status: "Creado",
      deliveryId: null,
      destination: `SRID=4326;POINT(${lng} ${lat})`
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
      status: "En entrega",
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
      status: "Declinado"
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
      status: "Entregado"
    });

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateDeliveryPosition = async (req, res) => {
  try {
    const { id } = req.params;
    const { lat, lng } = req.body;

    if (!lat || !lng) {
      return res.status(400).json({ message: "lat and lng are required" });
    }

    const updatedOrder = await updateOrderPosition(id, lat, lng);

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};