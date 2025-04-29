// get_notes/index.js

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient('https://qdeuttdushjmtlcovhjr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkZXV0dGR1c2hqbXRsY292aGpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5MjcyNTksImV4cCI6MjA2MTUwMzI1OX0.vfVVhdlCHHg98LrqeyU3WDwxNEapsZy1OGW98009lds');

module.exports = async (req, res) => {
  const user_id = req.user.id; // Assuming you have user context

  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('user_id', user_id);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(200).json(data);
};
