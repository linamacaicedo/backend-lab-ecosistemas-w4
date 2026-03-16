let orders = [];

export const createOrder = (order) => {
  orders.push(order);
  return order;
};

export const getAllOrders = () => {
  return orders;
};

export const getOrderById = (id) => {
  return orders.find(order => order.id == id);
};

export const updateOrder = (updatedOrder) => {
  const index = orders.findIndex(order => order.id == updatedOrder.id);

  if (index !== -1) {
    orders[index] = updatedOrder;
  }

  return updatedOrder;
};