# 🔐 AuthCore API

A secure and scalable authentication and user management API built using **Node.js, Express, and PostgreSQL**.
This project implements real-world backend practices including JWT authentication, role-based authorization, and soft delete functionality.

---

## 🚀 Features

* ✅ User Registration (with hashed passwords using bcrypt)
* ✅ User Login with JWT Authentication
* ✅ Protected Routes using Middleware
* ✅ Get Current Logged-in User (`/me`)
* ✅ Update User Profile (username & password)
* ✅ Soft Delete Account (no permanent deletion)
* ✅ Role-Based Authorization (User / Admin)
* ✅ Admin-only Route to Fetch All Users

---

## 🛠️ Tech Stack

* **Node.js**
* **Express.js**
* **PostgreSQL**
* **JWT (jsonwebtoken)**
* **bcrypt**

---

## 📂 Project Structure

```
AuthCore/
│
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── isAdmin.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── userRoutes.js
│   ├── utils/
│   │   └── generateToken.js
│
├── .env
├── server.js
└── package.json
```

---

## 🔑 API Endpoints

### 🔐 Authentication

| Method | Endpoint       | Description         |
| ------ | -------------- | ------------------- |
| POST   | /auth/register | Register a new user |
| POST   | /auth/login    | Login and get token |

---

### 👤 User Routes

| Method | Endpoint          | Description                     |
| ------ | ----------------- | ------------------------------- |
| GET    | /api/users/me     | Get current user (protected)    |
| PUT    | /api/users/update | Update profile (protected)      |
| DELETE | /api/users/delete | Soft delete account (protected) |

---

### 👑 Admin Routes

| Method | Endpoint       | Description                |
| ------ | -------------- | -------------------------- |
| GET    | /api/users/all | Get all users (admin only) |

---

## 🔐 Authentication

All protected routes require a JWT token in headers:

```
Authorization: Bearer YOUR_TOKEN
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory and add:

```
PORT=5000
DATABASE_URL=your_postgres_connection_string
JWT_SECRET=your_secret_key
```

---

## 🧪 Running the Project

```bash
# Install dependencies
npm install

# Run server
npm run dev
```

Server will run on:

```
http://localhost:5000
```

---

## 🧠 Key Concepts Implemented

* Password hashing with bcrypt
* JWT-based authentication
* Middleware for route protection
* Role-based access control
* Soft delete pattern for data safety
* Clean folder structure (MVC pattern)

---

## 👨‍💻 Author

**Zaib**

---

## ⭐ Final Note

This project demonstrates a strong foundation in backend development and follows real-world best practices for building secure and scalable APIs.

