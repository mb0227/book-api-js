### Book API

This is a RESTful API for managing books, authors, genres, and publisher details using Node.js, Express, and MongoDB. The API supports user authentication, book data management, and more.

## Features
- User authentication (registration & login)
- CRUD operations for books, authors, genres, and publication details
- Secure password hashing using bcrypt
- MongoDB as the database
- Express.js as the web framework
- CORS enabled for cross-origin requests

## Technologies Used
- Node.js
- Express.js
- MongoDB (Mongoose ODM)
- bcrypt (for password hashing)
- dotenv (for environment variables)
- Jest & Supertest (for testing)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/book-api.git
   cd book-api
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the root directory and configure it:
   ```sh
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   TEST_PORT=3001
   ```
4. Start the server:
   ```sh
   npm start
   ```

## API Endpoints

### Authentication
- **POST** `/api/auth/register` - Register a new user
- **POST** `/api/auth/login` - Authenticate and get a token

### Books
- **GET** `/api/books` - Fetch all books
- **POST** `/api/books` - Add a new book
- **GET** `/api/books/:id` - Get book by ID
- **PUT** `/api/books/:id` - Update book details
- **DELETE** `/api/books/:id` - Delete a book

### Authors
- **GET** `/api/authors` - Fetch all authors
- **POST** `/api/authors` - Add a new author
- **GET** `/api/authors/:id` - Get author by ID
- **PUT** `/api/authors/:id` - Update author details
- **DELETE** `/api/authors/:id` - Delete an author

### Genres
- **GET** `/api/genres` - Fetch all genres
- **POST** `/api/genres` - Add a new genre
- **GET** `/api/genres/:id` - Get genre by ID
- **PUT** `/api/genres/:id` - Update genre details
- **DELETE** `/api/genres/:id` - Delete an genre

### Publications
- **GET** `/api/publishers` - Fetch all publishers details
- **POST** `/api/publishers` - Add publishers details
- **GET** `/api/publishers/:id` - Get publishers by ID
- **PUT** `/api/publishers/:id` - Update publishers details
- **DELETE** `/api/publishers/:id` - Delete an publishers

## Testing
Run the test suite using:
```sh
npm test
```

## Common Issues
### Duplicate Key Error
If you encounter the error:
```
MongoServerError: E11000 duplicate key error collection: bookDB.users index: Username_1 dup key: { Username: null }
```
Check the following:
- Ensure that `username` is properly passed in the request body.
- Validate user input before saving to the database.
- Drop existing indexes if needed:
  ```sh
  db.users.dropIndex("Username_1")
  db.users.createIndex({ username: 1 }, { unique: true });
  db.users.deleteMany({ username: null });
  db.users.deleteMany({ username: { $exists: false } }); 
  ```