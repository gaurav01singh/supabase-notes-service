// supabase/functions/post_notes/index.js

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabase = createClient(
  'https://qdeuttdushjmtlcovhjr.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkZXV0dGR1c2hqbXRsY292aGpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5MjcyNTksImV4cCI6MjA2MTUwMzI1OX0.vfVVhdlCHHg98LrqeyU3WDwxNEapsZy1OGW98009lds'
);
exports.handler = async (req, res) => {
  try {
    const body = await req.json(); // For Edge Functions format
    const { title, content } = body;

    return new Response(JSON.stringify({
      message: "Note created",
      note: { title, content }
    }), { status: 200 });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500
    });
  }
};

