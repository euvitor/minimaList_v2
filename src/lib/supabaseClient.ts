import { createClient } from "@supabase/supabase-js";
import type { Database } from "../types/database.types";

const supUrl = import.meta.env.VITE_SUPABASE_URL;
const supKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supUrl || !supKey) {
    throw new Error('Supabase variables not defined')
}

export const supabase = createClient<Database>(supUrl, supKey)