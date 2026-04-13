import { createClient } from "@supabase/supabase-js";

const supUrl = import.meta.env.VITE_SUPABASE_URL;
const supKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supUrl || !supKey) {
    throw new Error('Supabase variables not defined')
}

export const supabase = createClient(supUrl, supKey)