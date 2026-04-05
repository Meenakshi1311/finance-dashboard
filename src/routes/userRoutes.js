import express from "express";
import {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} from "../controllers/userController.js";
import { authorize } from "../middleware/roleMiddleware.js";
import { validate } from "../middleware/validate.js";
import { userSchema, mongoIdSchema } from "../utils/validationSchemas.js";

const router = express.Router();

/**
 * @route POST /users
 * @desc Create a new user (admin only)
 * @access Private
 */
router.post("/", authorize("admin"), validate({ body: userSchema.body }), createUser);

/**
 * @route GET /users
 * @desc Fetch all users (admin only)
 * @access Private
 */
router.get("/", authorize("admin"), getAllUsers);

/**
 * @route GET /users/:id
 * @desc Fetch a specific user (admin only)
 * @access Private
 */
router.get("/:id", authorize("admin"), validate({ params: mongoIdSchema.params }), getUserById);

/**
 * @route PATCH /users/:id
 * @desc Update a user profile (admin only)
 * @access Private
 */
router.patch("/:id", authorize("admin"), validate({ params: mongoIdSchema.params, body: userSchema.body.partial() }), updateUser);

/**
 * @route DELETE /users/:id
 * @desc Delete a user profile (admin only)
 * @access Private
 */
router.delete("/:id", authorize("admin"), validate({ params: mongoIdSchema.params }), deleteUser);

export default router;