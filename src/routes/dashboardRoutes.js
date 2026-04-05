import express from "express";
import { summary } from "../controllers/dashboardController.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

/**
 * @route GET /dashboard/summary
 * @desc Get aggregated dashboard summary based on user permissions
 * @access Private
 */
router.get("/summary", authorize("viewer", "analyst", "admin"), summary);

export default router;