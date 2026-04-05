import express from "express";
import cors from "cors";
import { mockAuth } from "./middleware/authMiddleware.js";

// Routes
import userRoutes from "./routes/userRoutes.js";
import recordRoutes from "./routes/recordRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

// Error Handler
import { errorHandler } from "./utils/errorHandler.js";

const app = express();

/**
 * Standard Middleware
 */
app.use(cors());
app.use(express.json()); // Essential for parsing JSON bodies

/**
 * Mock Authentication Middleware
 * In a real application, this would verify JWT tokens and populate req.user.
 */
app.use(mockAuth);

/**
 * API Routes
 */
app.use("/users", userRoutes);
app.use("/records", recordRoutes);
app.use("/dashboard", dashboardRoutes);

/**
 * Global Error Handler
 */
app.use(errorHandler);

export default app;