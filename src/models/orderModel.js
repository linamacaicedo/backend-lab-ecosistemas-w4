import { supabase } from "../config/supabase.js";

export const createOrder = async (order) => {
  const { data, error } = await supabase
    .from("orders")
    .insert([order])
    .select();

  if (error) throw new Error(error.message);
  return data[0];
};

export const getAllOrders = async () => {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("createdAt", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
};

export const getOrderById = async (id) => {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data;
};

export const updateOrder = async (id, fields) => {
  const { data, error } = await supabase
    .from("orders")
    .update(fields)
    .eq("id", id)
    .select();

  if (error) throw new Error(error.message);
  return data[0];
};

export const updateOrderPosition = async (id, lat, lng) => {
  const position = `SRID=4326;POINT(${lng} ${lat})`;

  const { data, error } = await supabase
    .from("orders")
    .update({
      delivery_position: position,
    })
    .eq("id", id)
    .select();

  if (error) throw new Error(error.message);
  return data[0];
};

export const getOrdersByConsumerId = async (consumerId) => {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("consumerId", consumerId)
    .order("createdAt", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
};

export const getOrdersByStoreId = async (storeId) => {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("storeId", storeId)
    .order("createdAt", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
};

export const getAvailableOrders = async () => {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("status", "Creado")
    .is("deliveryId", null)
    .order("createdAt", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
};

export const getAcceptedOrdersByDeliveryId = async (deliveryId) => {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("deliveryId", deliveryId)
    .eq("status", "En entrega")
    .order("createdAt", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
};