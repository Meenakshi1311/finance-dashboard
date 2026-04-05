import express from "express";
import {
    createRecord,
    getRecords,
    updateRecord,
    deleteRecord
} from "../controllers/recordController.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", authorize("admin"), createRecord);
router.get("/", authorize("analyst", "admin"), getRecords);
router.patch("/:id", authorize("admin"), updateRecord);
router.delete("/:id", authorize("admin"), deleteRecord);

export default router;