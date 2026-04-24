// deno-lint-ignore-file no-import-prefix
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// You NEED these CORS headers, otherwise the browser will block the request
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests (the browser asking "is it safe to send this?")
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // 1. Grab the "order" sent from your dbContext
    const { action, table, data, match } = await req.json();

    // 2. Create a secure Supabase client on the server.
    // By passing the Authorization header, the database still knows which user is logged in!
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      },
    );

    let dbResult;

    // 3. The Switchboard: Execute the right database action based on the "order"
    switch (action) {
      case "CREATE":
        dbResult = await supabaseClient.from(table).insert(data).select();
        break;

      // deno-lint-ignore no-case-declarations
      case "READ":
        // A basic read. You can upgrade this later to handle complex filtering if needed.
        let query = supabaseClient.from(table).select("*");
        if (match) query = query.match(match);
        dbResult = await query;
        break;

      case "UPDATE":
        dbResult = await supabaseClient.from(table).update(data).match(match)
          .select();
        break;

      case "DELETE":
        dbResult = await supabaseClient.from(table).delete().match(match);
        break;

      default:
        throw new Error(`Bro, I don't know what action '${action}' is.`);
    }

    // If the database threw an error, catch it here
    if (dbResult.error) throw dbResult.error;

    // Send the W back to the frontend
    return new Response(
      JSON.stringify({ success: true, data: dbResult.data }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      },
    );
  } catch (error) {
    console.error("Edge Function Error:", error.message);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      },
    );
  }
});
