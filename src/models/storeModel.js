import { supabase } from "../config/supabase.js";

export const createStore = async (store) => {
  const { data, error } = await supabase
    .from("stores")
    .insert([store])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data[0];
};

export const getAllStores = async () => {
  const { data, error } = await supabase
    .from("stores")
    .select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getStoreByUserId = async (userId) => {
  const { data, error } = await supabase
    .from("stores")
    .select("*")
    .eq("userId", userId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const updateStore = async (id, fields) => {
  const { data, error } = await supabase
    .from("stores")
    .update(fields)
    .eq("id", id)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data[0];
};