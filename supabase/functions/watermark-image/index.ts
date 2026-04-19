import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import {
  createCanvas,
  loadImage,
} from "https://deno.land/x/canvas@v1.4.0/mod.ts";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

Deno.serve(async (req: Request) => {
  const { path } = await req.json();

  if (!path) {
    return new Response(JSON.stringify({ error: "Missing path" }), {
      status: 400,
    });
  }

  try {
    // Download original image from listings bucket
    const { data: imageData } = await supabase.storage
      .from("listings")
      .download(path);

    if (!imageData) throw new Error("Failed to download image");

    // Download logo from assets bucket
    const { data: logoData } = await supabase.storage
      .from("assets")
      .download("logo.png");

    if (!logoData) throw new Error("Logo not found in assets/logo.png");

    const original = await loadImage(imageData);
    const logo = await loadImage(logoData);

    const canvas = createCanvas(original.width, original.height);
    const ctx = canvas.getContext("2d");

    // Draw original image
    ctx.drawImage(original, 0, 0);

    // Watermark settings (bottom-right, semi-transparent, 15% of width)
    const logoWidth = Math.floor(original.width * 0.15);
    const logoHeight = Math.floor((logo.height / logo.width) * logoWidth);

    ctx.globalAlpha = 0.75;
    ctx.drawImage(
      logo,
      original.width - logoWidth - 30,
      original.height - logoHeight - 30,
      logoWidth,
      logoHeight,
    );
    ctx.globalAlpha = 1.0;

    // Convert to buffer and upload back (overwrite original)
    const watermarkedBuffer = canvas.toBuffer("image/jpeg", { quality: 0.92 });

    const { error: uploadError } = await supabase.storage
      .from("listings")
      .upload(path, watermarkedBuffer, {
        contentType: "image/jpeg",
        upsert: true,
      });

    if (uploadError) throw uploadError;

    return new Response(
      JSON.stringify({ success: true, path }),
      { headers: { "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
});
