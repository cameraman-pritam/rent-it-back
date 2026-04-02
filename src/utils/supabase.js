import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://jpvixtyfdxfepexobwbb.supabase.co";
// IMPORTANT: Replace with your actual anon key.
// You can find this in your Supabase project's API settings.
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impwdml4dHlmZHhmZXBleG9id2JiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ5NjQ2MjgsImV4cCI6MjA5MDU0MDYyOH0.clJLVmKfdc0ZQYlPB6yi3gNFe__tZbLinOfYk0dWEbI";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
