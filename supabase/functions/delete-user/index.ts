import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req) => {
  // ✅ Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // ---------------------------
    // 1. Get Authorization header
    // ---------------------------
    const authHeader = req.headers.get("Authorization");

    if (!authHeader) {
      throw new Error("Missing Authorization header");
    }

    const token = authHeader.replace("Bearer ", "");

    // ---------------------------
    // 2. Create ADMIN Supabase client
    // ---------------------------
    // Using Supabase's built-in env variables so you don't have to manually set them!
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );

    // ---------------------------
    // 3. Verify user from JWT
    // ---------------------------
    const {
      data: { user },
      error: userError,
    } = await supabaseAdmin.auth.getUser(token);

    if (userError || !user) {
      console.error("Auth error:", userError);
      // Return a 401 specifically for real auth issues
      return new Response(
        JSON.stringify({ error: "Unauthorized or invalid token" }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // ---------------------------
    // 4. Delete user (SELF ONLY)
    // ---------------------------
    const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(
      user.id,
    );

    if (deleteError) {
      console.error("Delete error:", deleteError);
      throw deleteError;
    }

    // ---------------------------
    // 5. Success response
    // ---------------------------
    return new Response(
      JSON.stringify({
        message: "User deleted successfully",
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
        status: 200,
      },
    );
  } catch (err) {
    console.error("Function crashed:", err);
    // Returning a 400 here instead of 401 so you know it's a code/server error, not an auth error!
    return new Response(
      JSON.stringify({
        error: err instanceof Error ? err.message : "Unknown error occurred",
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
        status: 400,
      },
    );
  }
});
