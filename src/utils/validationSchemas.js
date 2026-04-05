import { z } from "zod";

/**
 * Validation schemas for User operations.
 */
export const userSchema = {
    body: z.object({
        name: z.string().min(2, "Name must be at least 2 characters").max(50),
        email: z.string().email("Invalid email format"),
        role: z.enum(["viewer", "analyst", "admin"]).optional(),
        status: z.enum(["active", "inactive"]).optional()
    })
};

/**
 * Validation schemas for Record operations.
 */
export const recordSchema = {
    body: z.object({
        amount: z.number().positive("Amount must be a positive number"),
        type: z.enum(["income", "expense"], "Type must be either income or expense"),
        category: z.string().min(1, "Category is required"),
        date: z.string().datetime().optional(), // Expected ISO string format
        notes: z.string().max(500).optional()
    })
};

/**
 * Common schema for MongoDB ObjectId validation in params.
 */
export const mongoIdSchema = {
    params: z.object({
        id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format")
    })
};
