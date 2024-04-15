import { env } from "@/env";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);

export default supabase;
