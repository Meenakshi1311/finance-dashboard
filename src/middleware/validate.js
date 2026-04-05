import { z } from "zod";

/**
 * Validation middleware to validate request against a Zod schema.
 * @param {Object} schema - Zod schema object with optional body, params, and query keys.
 */
export const validate = (schema) => (req, res, next) => {
    try {
        const result = z.object({
            body: schema.body || z.any(),
            params: schema.params || z.any(),
            query: schema.query || z.any()
        }).safeParse({
            body: req.body,
            params: req.params,
            query: req.query
        });

        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: "Validation Error",
                errors: result.error.errors.map(err => ({
                    field: err.path.join("."),
                    message: err.message
                }))
            });
        }

        // Replace request data with parsed/formatted data
        req.body = result.data.body;
        // params and query are often read-only getters; Object.assign updates the properties within the object
        Object.assign(req.params, result.data.params);
        Object.assign(req.query, result.data.query);

        next();
    } catch (error) {
        next(error);
    }
};
