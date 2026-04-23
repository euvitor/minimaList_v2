/*
  Cliente único do Supabase para o app (frontend).
  As variáveis vêm do Vite (`VITE_*`); importe este módulo em vez de criar clientes
  em vários lugares. O tipo `Database` mantém as queries alinhadas ao schema.
*/

import { createClient } from "@supabase/supabase-js";
import type { Database } from "../types/database.types";

const supUrl = import.meta.env.VITE_SUPABASE_URL;
const supKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supUrl || !supKey) {
    // Falha cedo: evita erro “misterioso” de auth por env faltando/errada.
    throw new Error('Supabase variables not defined')
}

export const supabase = createClient<Database>(supUrl, supKey)