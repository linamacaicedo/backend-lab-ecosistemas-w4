import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

console.log("SUPABASE URL:", supabaseUrl);
console.log("SUPABASE KEY LOADED:", !!supabaseKey);

export const supabase = createClient(supabaseUrl, supabaseKey);