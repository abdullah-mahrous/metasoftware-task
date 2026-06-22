# Personal Blogging Platform API

A secure and scalable RESTful API for a Personal Blogging Platform built with Node.js, Express, TypeScript, MongoDB, and Mongoose.

The API allows users to register, authenticate using JWT, and manage their own blog posts through protected CRUD operations.

## Features

- User registration and authentication
- Password hashing using bcrypt
- JWT-based authorization
- Blog post CRUD operations
- Ownership-based access control
- Request validation using Zod
- MongoDB Atlas integration
- Swagger/OpenAPI documentation
- Security middleware (Helmet, CORS, and Mongo Sanitize)
- Global error handling

## Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB Atlas
- Mongoose
- JWT (JSON Web Tokens)
- bcrypt
- Zod
- Swagger / OpenAPI

## Database Choice

This project uses MongoDB Atlas with Mongoose.

MongoDB was chosen because its document-based model maps naturally to blog posts and users. Combined with Mongoose, it provides schema validation, document relationships through references, middleware support, and a fast development workflow while remaining scalable for future growth.

## Setup & Run Locally

### 1. Clone the Repository

```bash
git clone https://github.com/abdullah-mahrous/metasoftware-task.git
cd metasoftware-task
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create a MongoDB Atlas Cluster

1. Create a free MongoDB Atlas account.
2. Create a new cluster.
3. Create a database user.
4. Add your IP address under **Network Access**.
5. Obtain the MongoDB connection string.
6. Replace `<password>` in the connection string with your database user's password.

### 4. Create a `.env` File

Create a `.env` file in the project root:

```env
PORT=3000
DBURI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:3000
```

#### Environment Variables

| Variable | Description |
|----------|-------------|
| PORT | Application port |
| DBURI | MongoDB Atlas connection string |
| JWT_SECRET | Secret key used to sign JWT tokens |
| JWT_EXPIRE | JWT expiration time |
| CORS_ORIGIN | Allowed frontend origin |

Notes:

- Replace `your_mongodb_connection_string` with the connection string obtained from MongoDB Atlas.
- Replace `your_jwt_secret` with a secure random string.
- Example JWT secret:

```txt
f4b2d0f5e7a34f9b8e6c1a2d7f3b9e4c
```

### 5. Start the Development Server

```bash
npm run dev
```

The API will be available at:

```txt
http://localhost:3000
```

Swagger Documentation:

```txt
http://localhost:3000/api-docs
```

---

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|----------|----------|----------|
| POST | `/api/auth/register` | Register a new user and return a JWT |
| POST | `/api/auth/login` | Authenticate a user and return a JWT |

### Posts

| Method | Endpoint | Description | Authentication Required |
|----------|----------|----------|----------|
| GET | `/api/posts` | Get all posts | No |
| GET | `/api/posts/:id` | Get a single post by ID | No |
| POST | `/api/posts` | Create a new post | Yes |
| PUT | `/api/posts/:id` | Update an existing post | Yes |
| DELETE | `/api/posts/:id` | Delete a post | Yes |

## Authentication

Protected endpoints require a JWT token in the `Authorization` header:

```http
Authorization: Bearer <token>
```

## API Documentation

Interactive Swagger documentation is available at:

```txt
/api-docs
```

or locally:

```txt
http://localhost:3000/api-docs
```

## Assumptions & Notes

- Users can only update or delete their own posts.
- Passwords are hashed before storage using bcrypt.
- JWT authentication is used to protect post creation, update, and deletion endpoints.
- MongoDB Atlas is used as the cloud database provider.
- Input validation is performed using Zod before requests reach the business logic layer.
- Posts are returned sorted by newest first.
- User passwords are never returned in API responses.
- Swagger/OpenAPI documentation is included for all available endpoints.

## Live Demo

Railway Deployment:

[https://metasoftware-task-production-64e8.up.railway.app](https://metasoftware-task-production-64e8.up.railway.app)

## Author

Abdullah Mahrous

GitHub: https://github.com/abdullah-mahrous
