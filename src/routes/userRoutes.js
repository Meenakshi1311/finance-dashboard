import express from "express";
import { createUser, getUsers, updateUser } from "../controllers/userController.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", authorize("admin"), createUser);
router.get("/", authorize("admin"), getUsers);
router.patch("/:id", authorize("admin"), updateUser);

export default router;