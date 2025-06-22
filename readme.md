# 📖 Library Management API

An Express, TypeScript, and MongoDB-powered Library Management System API.

---

## 🎯 Objective

Build a RESTful backend for managing books and borrowings, featuring:

- Schema validation
- Business logic enforcement (book availability)
- Aggregation pipelines
- Mongoose static and middleware methods
- Filtering, sorting, and pagination
- Global error handling

---

## 📚 Book Endpoints

### 📗 Create Book  
**POST** `/api/books`

Request body:
```json
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5,
  "available": true
}
📘 Get All Books
GET /api/books

Supports filters:

filter: genre

sortBy: field (e.g., createdAt)

sort: asc or desc

limit: number of results

Example:

bash
Copy
Edit
/api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5
🔍 Get Book by ID
GET /api/books/:bookId

✏️ Update Book
PUT /api/books/:bookId

Request body:

json
Copy
Edit
{
  "copies": 50
}
❌ Delete Book
DELETE /api/books/:bookId

⚠️ Book cannot be deleted if there are associated borrow records.

📕 Borrow Endpoints
📥 Borrow a Book
POST /api/borrow

Request body:

json
Copy
Edit
{
  "book": "<bookId>",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
Business Logic:

Checks available copies

Deducts quantity

If copies reach 0, marks the book as unavailable

Saves borrow entry

📊 Borrowed Books Summary
GET /api/borrow

Response:

json
Copy
Edit
[
  {
    "book": {
      "title": "The Theory of Everything",
      "isbn": "9780553380163"
    },
    "totalQuantity": 5
  }
]
✅ Validations
📗 Book Schema
title, author, genre, isbn, copies — required

isbn — must be unique

genre — must be one of:
FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY

copies — must be a non-negative integer

available — defaults to true

📘 Borrow Schema
book — required (ObjectId)

quantity — positive integer

dueDate — valid date

🧪 Error Handling
Generic error response format:

json
Copy
Edit
{
  "success": false,
  "message": "Validation failed",
  "error": {
    "name": "ValidationError",
    "errors": {
      "copies": {
        "message": "Copies must be a positive number"
      }
    }
  }
}
Handles:

Validation errors

Not found errors

Mongo duplicate key errors (e.g., ISBN)

🔄 Project Setup
🧬 Clone the repo
bash
Copy
Edit
git clone https://github.com/Tafhim301/Library_Management_Backend
cd Library-Management-API
📦 Install dependencies
bash
Copy
Edit
npm install
🛠️ Set up environment variables
Create a .env file:

ini
Copy
Edit
DB_URI=mongodb+srv://...
PORT=5000
🔧 Build & Run
bash
Copy
Edit
npm run build && npm start
💻 Dev mode
bash
Copy
Edit
npm run dev
🌐 Live API
Base URL:
https://library-management-backend-rosy.vercel.app

Try endpoints like:
GET /api/books

🎥 Video Explanation
📺 Watch explanation on YouTube: (Add your public video link here)

✅ Submission Checklist
✅ All API endpoints implemented

✅ Validation and error handling done

✅ Aggregation used for borrow summary

✅ Mongoose middleware and static method used

✅ Proper README.md written

✅ Deployed on Vercel

✅ Code pushed to GitHub

👨‍💻 Author
Tafhimul Islam
GitHub: @Tafhim301


