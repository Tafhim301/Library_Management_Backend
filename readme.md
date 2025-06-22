# 📚 Library Management API

An Express.js + TypeScript + MongoDB based backend project for managing books and borrow records. Developed as part of **Apollo Level 2 Web Development Course (Assignment 3)**.

---

## 🌟 Features

- ✅ Add, update, delete, and retrieve books
- ✅ Borrow books with quantity and due date validation
- ✅ Auto-update book availability when borrowed copies run out
- ✅ Validation with Zod and Mongoose
- ✅ Aggregation pipeline for borrow summaries
- ✅ Middleware, static methods, instance methods included
- ✅ Error handling and input filtering
- ✅ Fully RESTful API design

---

## 🧰 Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB + Mongoose
- Zod (for request validation)
- Vercel (deployment)

---

## 🚀 API Endpoints

### 📗 Books

#### ➕ Create Book
**POST** `/api/books`

**Request body:**
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
```

---

#### 📚 Get All Books
**GET** `/api/books`

**Supports filters:**

- `filter`: genre
- `sortBy`: field (e.g., createdAt)
- `sort`: asc or desc
- `limit`: number of results

**Example:**
```bash
/api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5
```

---

#### 🔍 Get Book by ID
**GET** `/api/books/:bookId`

---

#### ✏️ Update Book
**PUT** `/api/books/:bookId`

**Request body:**
```json
{
  "copies": 50
}
```

---

#### ❌ Delete Book
**DELETE** `/api/books/:bookId`

> **Note:** Book cannot be deleted if there are associated borrow records.

---

### 📕 Borrow

#### 📥 Borrow a Book
**POST** `/api/borrow`

**Request body:**
```json
{
  "book": "<bookId>",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```

**Business Logic:**

- Checks available copies
- Deducts quantity
- If copies reach 0, marks the book as unavailable
- Saves borrow entry

---

#### 📊 Borrowed Books Summary
**GET** `/api/borrow`

**Returns:**
```json
[
  {
    "book": {
      "title": "The Theory of Everything",
      "isbn": "9780553380163"
    },
    "totalQuantity": 5
  }
]
```

---

## ✅ Validations

### Book Schema
- `title`, `author`, `genre`, `isbn`, `copies` are required
- `isbn` must be unique
- `genre` must be one of: `FICTION`, `NON_FICTION`, `SCIENCE`, `HISTORY`, `BIOGRAPHY`, `FANTASY`
- `copies` must be a non-negative integer
- `available` defaults to `true`

### Borrow Schema
- `book` (ObjectId) required
- `quantity` must be a positive integer
- `dueDate` must be a valid date

---

## 🧪 Error Handling

**Generic error response format:**
```json
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
```

---

## 🔄 Project Setup

**Clone the repo**
```bash
git clone https://github.com/Tafhim301/Library_Management_Backend
cd Library-Management-API
```

**Install dependencies**
```bash
npm install
```

**Set up environment variables**

Create a `.env` file:
```ini
DB_URI=mongodb+srv://...
PORT=5000
```

**Build and run**
```bash
npm run build && npm start
```

**Dev mode**
```bash
npm run dev
```

---

## 🌐 Live API

Base URL:  
**https://library-management-backend-rosy.vercel.app**

Try endpoints like:  
`GET /api/books`

---

## 🎥 Video Explanation

📺 [Watch explanation on YouTube](#) *(Replace with your actual video link)*

---

## 📌 Submission Checklist

- ✅ All required API endpoints implemented  
- ✅ Validations and error handling done  
- ✅ Aggregation used in borrow summary  
- ✅ Middleware and static method used  
- ✅ README written  
- ✅ Deployed to Vercel  
- ✅ Final code pushed to GitHub  

---

## 👨‍💻 Author

**Tafhimul Islam**  
GitHub: [@tafhim301](https://github.com/tafhim301)
