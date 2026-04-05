# Finance Dashboard Backend

A professional, service-oriented Node.js and Express backend designed for personal finance management. This application provides a robust API for tracking income/expenses and generating financial summaries.

---
By Meenakshi Srivastava
## 🚀 Features

- **Service-Oriented Architecture**: Clean separation of concerns between controllers, services, and models.
- **Role-Based Access Control**: Different permissions for `admin`, `analyst`, and `viewer`.
- **Advanced Aggregation**: Real-time financial summaries using MongoDB's aggregation framework.
- **Robust Validation**: Schema-based request validation using **Zod**.
- **Global Error Handling**: Standardized error responses with appropriate HTTP status codes.

## 🛠️ Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js (v5.x with native async support)
- **Database**: MongoDB with Mongoose ODM
- **Validation**: Zod
- **Environment**: ECMAScript Modules (ESM)

---

## ⚙️ Setup & Installation

### 1. Prerequisites
- Node.js (v16+)
- MongoDB Atlas account (or local MongoDB instance)

### 2. Installation
```bash
git clone <repository-url>
cd finance-dashboard-backend
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory (use `.env.example` as a template):
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/financeDB
```

### 4. Running the App
- **Development**: `npm run dev` (uses nodemon)
- **Production**: `npm start`

---

## 🔌 API Documentation & Testing

### 📊 Dashboard
- **GET /dashboard/summary**: Returns totals for income, expense, and net balance.
  - **Logic**: Admins see totals for all records; regular users see only their own.
  - **Test**: `curl -X GET http://localhost:5000/dashboard/summary`

### 🗒️ Records
- **GET /records**: Fetch records based on permissions.
  - **Test**: `curl -X GET http://localhost:5000/records`
- **POST /records**: Create a new financial record.
  - **Required Body**: `amount`, `type` (income/expense), `category`.
  - **Test**:
    ```bash
    curl -X POST http://localhost:5000/records \
         -H "Content-Type: application/json" \
         -d '{ "amount": 1200, "type": "income", "category": "Salary" }'
    ```
- **PATCH /records/:id**: Update an existing record (Owner or Admin only).
- **DELETE /records/:id**: Delete a record (Owner or Admin only).

### 👥 Users
- **GET /users**: List all users (Admin only).
- **POST /users**: Register a new user profile.
  - **Test**:
    ```bash
    curl -X POST http://localhost:5000/users \
         -H "Content-Type: application/json" \
         -d '{ "name": "Meenakshi", "email": "meenakshi@example.com", "role": "admin" }'
    ```

---

## 🏗️ Architecture & Design Decisions

### Controller-Service-Model Pattern
I implemented a strict **Service Layer** to decouple business logic from the HTTP layer (Controllers). This makes the code significantly easier to unit test and maintain.
- **Controllers**: Handle request/response and status codes.
- **Services**: Contain the core logic (e.g., matching User IDs, aggregation math).
- **Models**: Define the data structure and handle database-level validation.

### Validation via Zod
Instead of manual `if/else` checks in controllers, I used **Zod** middleware. This ensures that only valid data enters the system, preventing common "undefined" errors or bad data states.

---

## 🧠 Assumptions Made

1.  **Mock Authentication**: Since a full JWT/Session auth system was out of scope for this assignment, I assumed a `mockAuth` middleware (located in `src/middleware/authMiddleware.js`) would simulate a logged-in user.
2.  **User Ownership**: I assumed that every record must be tied to a `createdBy` user ID to enable true multi-user functionality.
3.  **Role Hierarchy**:
    - `admin`: Can see and manage everything.
    - `analyst`/`viewer`: Can manage their own data and view their own summary.

---

## ⚖️ Tradeoffs Considered

### Express 5 vs Express 4
I chose **Express 5.x** because it natively handles asynchronous errors. 
- **Benefit**: Removes the need for bulky `try/catch` blocks in every controller or external packages like `express-async-errors`.
- **Tradeoff**: Express 5 is in a later release stage, but its cleaner syntax is better for modern assignments.

### Validation Placement
I considered placing validation inside the Mongoose models versus a specialized middleware.
- **Decision**: Used **Zod middleware** for external API validation and **Mongoose** for internal data integrity.
- **Reason**: Middleware validation catches errors earlier in the request lifecycle, reducing unnecessary database hits.

### In-Memory vs Persistent DB
I stuck with **MongoDB (Mongoose)** rather than an in-memory array.
- **Tradeoff**: Increases setup complexity (requires a connection string).
- **Benefit**: Demonstrates proficiency in handling asynchronous database operations and complex aggregations (Criteria #5).

---

## 📂 Project Structure

```text
src/
├── config/         # DB connection setup
├── controllers/    # API request handlers
├── middleware/     # Auth, Validation, and Roles
├── models/         # Mongoose Schemas (User, Record)
├── routes/         # Endpoint definitions
├── services/       # Core Business Logic (The "Brain")
├── utils/          # Error Handler & Validation Schemas
├── app.js          # Express app entry
└── server.js      # Server startup script
```
