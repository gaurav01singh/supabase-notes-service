import { createClient } from "jsr:@supabase/supabase-js@2";
Deno.serve(async (req)=>{
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization"
      }
    });
  }
  try {
    const supabaseClient = createClient(Deno.env.get("SUPABASE_URL"), Deno.env.get("SUPABASE_ANON_KEY"));
    const { title, content } = await req.json();
    // Insert note with user_id
    const { data, error } = await supabaseClient.from("notes").insert([
      {
        title,
        content
      }
    ]);
    if (error) throw error;
    return new Response(JSON.stringify({
      data: {
        title,
        content
      },
      message: "success"
    }), {
      headers: {
        "Content-Type": "application/json"
      },
      status: 201
    });
  } catch (error) {
    return new Response(JSON.stringify({
      error: error.message,
      message: "asdasd"
    }), {
      headers: {
        "Content-Type": "application/json"
      },
      status: 400
    });
  }
});
