import { supabase } from "../config/supabase.js";

export const createUser = async (user) => {
  const { data, error } = await supabase
    .from("users")
    .insert([user])
    .select();

  if (error) {
    console.log("INSERT ERROR:", error);
    throw new Error(error.message);
  }

  return data[0];
};

export const getUserByEmail = async (email) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .maybeSingle();

  if (error) {
    console.log("SELECT ERROR:", error);
    throw new Error(error.message);
  }

  return data;
};

export const getAllUsers = async () => {
  const { data, error } = await supabase
    .from("users")
    .select("*");

  if (error) {
    console.log("GET ALL ERROR:", error);
    throw new Error(error.message);
  }

  return data;
};