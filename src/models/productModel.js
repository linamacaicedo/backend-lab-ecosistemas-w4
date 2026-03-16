import { supabase } from "../config/supabase.js";

export const createProduct = async (product) => {
  const { data, error } = await supabase
    .from("products")
    .insert([product])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data[0];
};

export const getAllProducts = async () => {
  const { data, error } = await supabase
    .from("products")
    .select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data;
};