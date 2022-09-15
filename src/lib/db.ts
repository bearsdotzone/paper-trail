import { PrismaClient } from '@prisma/client'
import Redis from 'redis'

let prisma: PrismaClient;

prisma = new PrismaClient();

export default prisma;

import { createClient } from '@supabase/supabase-js';


export const supabaseClient = createClient(import.meta.env.VITE_SUPABASE_URL as string, import.meta.env.VITE_SUPABASE_ANON_KEY as string, {
    persistSession: false,
    autoRefreshToken: false
});