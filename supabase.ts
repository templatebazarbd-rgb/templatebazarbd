
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gbndovsmvwydxjoeello.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdibmRvdnNtdnd5ZHhqb2VlbGxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk5NjY5ODUsImV4cCI6MjA4NTU0Mjk4NX0.OLwIUzT8peSDVRKASegluZZsHHGf5qq4wnQAYzXeFVg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
