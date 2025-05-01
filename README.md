 
- Primary Key: `uuid` for global uniqueness across distributed systems.
- `title`: Text for note title (required).
- `content`: Optional detailed content.
- `created_at`: Auto-filled timestamp for note creation.

## Assignment Completion Details

### Setup & Deployment Steps
1. **Supabase Project Setup**:
    - Create a new project on the [Supabase website](https://supabase.com/).
    - Configure the environment variables for your project.

2. **Environment Variables**:
    - Add the Supabase URL and API Key to your environment configuration.

3. **Deploy Edge Functions**:
    - Upload the `post_notes.js` and `get_notes.js` files to the `functions/` directory in your Supabase project.
    - Deploy the functions via the Supabase dashboard.

4. **Database Schema**:
    - Execute the `schema.sql` file in the SQL editor of your Supabase project to create the `notes` table.

---

### Why I Chose This Schema
- **Primary Key (`id`)**: A UUID ensures global uniqueness and avoids conflicts in distributed systems.
- **`title`**: Text type is used for the note title, which is required for clarity and organization.
- **`content`**: Optional text type allows flexibility for detailed note descriptions.
- **`created_at`**: A timestamp with a default value of `now()` ensures automatic tracking of note creation time.

---

### Why I Chose These Endpoints
1. **POST `/notes`**:
    - **HTTP Method**: POST is used to create new resources.
    - **URL Path**: `/notes` logically represents the resource being created.
    - **Parameters**: Read from the request body for structured input.

2. **GET `/notes`**:
    - **HTTP Method**: GET is used to retrieve resources.
    - **URL Path**: `/notes` represents the collection of notes.
    - **Parameters**: User ID is read from the query or user context for filtering.

---

### Demo Script

#### Create a Note
```bash
curl -X POST '[https://qdeuttdushjmtlcovhjr.supabase.co/functions/v1/post_notes](https://qdeuttdushjmtlcovhjr.supabase.co/functions/v1/post_notes)' \
-H "Authorization: Bearer <your-access-token>" \
-H "Content-Type: application/json" \
-d '{
  "title": "My First Note",
  "content": "This is the content of my first note."
}'
```
**Sample Response**:
```json
{
  "message": "success",
  "note": {
     "title": "My First Note",
     "content": "This is the content of my first note."
  }
}
```

#### List Notes
```bash
curl -X GET '[https://qdeuttdushjmtlcovhjr.supabase.co/functions/v1/get_notes](https://qdeuttdushjmtlcovhjr.supabase.co/functions/v1/get_notes)' \
-H "Authorization: Bearer <your-access-token>"
```
**Sample Response**:
```json
[
  {
     "id": "123e4567-e89b-12d3-a456-426614174000",
     "title": "My First Note",
     "content": "This is the content of my first note.",
     "created_at": "2023-03-15T12:00:00Z"
  }
]
```

# Documentation

## Key Design Choices (The “Why?”)

### Schema Design
- **Why?**: The schema was designed to ensure data normalization, scalability, and maintainability. It follows best practices to minimize redundancy and improve query performance. Relationships between entities were carefully modeled to reflect real-world use cases and ensure data integrity.

### Endpoints
- **Why?**: Each endpoint was designed to serve a specific purpose, ensuring clarity and separation of concerns. The design prioritizes RESTful principles for consistency and ease of use.

### Edge Function Endpoints

1. **Create Notes**:
    - **Endpoint**: `https://qdeuttdushjmtlcovhjr.supabase.co/functions/v1/post_notes`
    - **Purpose**: This edge function is used to create new notes in the database.
    - **HTTP Method**: `POST`
    - **Input**: JSON payload containing `title` and optional `content`.
    - **Output**: A success message along with the created note details.

2. **Get All Notes**:
    - **Endpoint**: `https://qdeuttdushjmtlcovhjr.supabase.co/functions/v1/get_notes`
    - **Purpose**: This edge function retrieves all notes associated with the authenticated user.
    - **HTTP Method**: `GET`
    - **Input**: User authentication token.
    - **Output**: A list of notes with their details.
