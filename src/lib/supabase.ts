import { REACT_APP_SUPABASE_ANON, REACT_APP_SUPABASE_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';
import { Database } from '../types/supabase';

const supabaseUrl = REACT_APP_SUPABASE_URL;
const supabaseAnonKey = REACT_APP_SUPABASE_ANON;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
