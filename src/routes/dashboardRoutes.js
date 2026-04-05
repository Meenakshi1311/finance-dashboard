import express from "express";
import { summary } from "../controllers/dashboardController.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/summary", authorize("analyst", "admin"), summary);

export default router;