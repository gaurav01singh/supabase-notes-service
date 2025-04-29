 
- Primary Key: `uuid` for global uniqueness across distributed systems.
- `user_id` (uuid): Links notes to users via Supabase's auth.
- `title`: Text for note title (required).
- `content`: Optional detailed content.
- `created_at`: Auto-filled timestamp for note creation.
