import express from "express";
import cors from "cors";
import { mockAuth } from "./middleware/authMiddleware.js";

import userRoutes from "./routes/userRoutes.js";
import recordRoutes from "./routes/recordRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import { errorHandler } from "./utils/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(mockAuth);

app.use("/users", userRoutes);
app.use("/records", recordRoutes);
app.use("/dashboard", dashboardRoutes);

app.use(errorHandler);

export default app;