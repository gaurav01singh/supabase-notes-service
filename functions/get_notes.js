import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";
Deno.serve(async (req)=>{
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      }
    });
  }
  try {
    // Handle GET request
    if (req.method === 'GET') {
      // Create Supabase client
      const supabaseClient = createClient(Deno.env.get('SUPABASE_URL'), Deno.env.get('SUPABASE_ANON_KEY'));
      // Query the "notes" table to retrieve all notes
      const { data, error } = await supabaseClient.from('notes').select('*');
      if (error) throw error;
      // Return the fetched notes as JSON
      return new Response(JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json'
        },
        status: 200
      });
    } else {
      // Handle other request types (like POST)
      return new Response(JSON.stringify({
        error: 'Method Not Allowed'
      }), {
        headers: {
          'Content-Type': 'application/json'
        },
        status: 405
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({
      error: error.message,
      message: 'Error fetching notes'
    }), {
      headers: {
        'Content-Type': 'application/json'
      },
      status: 400
    });
  }
});
