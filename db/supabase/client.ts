import { createClient } from "@supabase/supabase-js";

const getSupabaseURL = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl) {
    throw new Error("Supabase URL not found");
  }
  return supabaseUrl;
};
const getSupabaseKey = () => {
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseKey) {
    throw new Error("Supabase key not found");
  }

  return supabaseKey;
};

const supabase = createClient(getSupabaseURL(), getSupabaseKey());

export default supabase;
