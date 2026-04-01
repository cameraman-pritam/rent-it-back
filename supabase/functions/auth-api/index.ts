import { eq } from "https://esm.sh/drizzle-orm@0.30.10";
import bcrypt from "https://esm.sh/bcryptjs@2.4.3";
import { db, users } from "./db.js";

// Define CORS headers directly in the file
const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // Or restrict this to your specific domain in production
  // IMPORTANT: Added 'action' to allow your custom header to pass through CORS
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, action",
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Ensure we are only parsing JSON on POST requests
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Method not allowed. Use POST." }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 405,
        }
      );
    }

    const { name, email, password } = await req.json();
    const action = req.headers.get("Action");

    // --- SIGNUP LOGIC ---
    if (action === "signup") {
      if (!name || !email || !password) {
        return new Response(
          JSON.stringify({ error: "Name, email, and password are required." }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 400,
          }
        );
      }

      const nameParts = name.trim().split(" ");
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(" ") || "";

      const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, email));
      if (existingUser.length > 0) {
        return new Response(
          JSON.stringify({
            error: "An account with this email already exists.",
          }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 409,
          }
        );
      }

      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = await db
        .insert(users)
        .values({ email, passwordHash, firstName, lastName })
        .returning({ id: users.id, email: users.email });

      return new Response(
        JSON.stringify({
          message: "Account created successfully!",
          user: newUser[0],
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 201,
        }
      );
    }

    // --- LOGIN LOGIC ---
    if (action === "login") {
      if (!email || !password) {
        return new Response(
          JSON.stringify({ error: "Email and password are required." }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 400,
          }
        );
      }

      const user = await db.select().from(users).where(eq(users.email, email));
      if (user.length === 0) {
        return new Response(
          JSON.stringify({ error: "Invalid email or password." }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 401,
          }
        );
      }

      const isPasswordValid = await bcrypt.compare(
        password,
        user[0].passwordHash
      );
      if (!isPasswordValid) {
        return new Response(
          JSON.stringify({ error: "Invalid email or password." }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 401,
          }
        );
      }

      // Destructure to remove the password hash before sending the user object back
      const { passwordHash: _discardedHash, ...userWithoutPassword } = user[0];

      return new Response(
        JSON.stringify({
          message: "Logged in successfully!",
          user: userWithoutPassword,
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        }
      );
    }

    // --- INVALID ACTION ---
    return new Response(
      JSON.stringify({ error: "Invalid action specified in headers." }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  } catch (error) {
    // If JSON parsing fails or another error occurs, catch it here
    return new Response(
      JSON.stringify({ error: error.message || "Internal Server Error" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});
