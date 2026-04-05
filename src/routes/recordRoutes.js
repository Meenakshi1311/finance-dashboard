import express from "express";
import {
    createRecord,
    getRecords,
    updateRecord,
    deleteRecord
} from "../controllers/recordController.js";
import { authorize } from "../middleware/roleMiddleware.js";
import { validate } from "../middleware/validate.js";
import { recordSchema, mongoIdSchema } from "../utils/validationSchemas.js";

const router = express.Router();

/**
 * @route POST /records
 * @desc Create a new record (admin only)
 * @access Private
 */
router.post("/", authorize("admin"), validate({ body: recordSchema.body }), createRecord);

/**
 * @route GET /records
 * @desc Fetch records based on role (Analyst/Admin)
 * @access Private
 */
router.get("/", authorize("analyst", "admin"), getRecords);

/**
 * @route PATCH /records/:id
 * @desc Update a record (admin only)
 * @access Private
 */
router.patch("/:id", authorize("admin"), validate({ params: mongoIdSchema.params, body: recordSchema.body.partial() }), updateRecord);

/**
 * @route DELETE /records/:id
 * @desc Delete a record (admin only)
 * @access Private
 */
router.delete("/:id", authorize("admin"), validate({ params: mongoIdSchema.params }), deleteRecord);

export default router;