import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://dummy.supabase.co';
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'dummy-key';

if (!process.env.REACT_APP_SUPABASE_URL || !process.env.REACT_APP_SUPABASE_ANON_KEY) {
  console.warn('Supabase environment variables are not set. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);