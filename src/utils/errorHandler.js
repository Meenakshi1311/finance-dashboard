/**
 * Global Error Handler Middleware
 */
export const errorHandler = (err, req, res, next) => {
    // Default to 500 Internal Server Error unless statusCode is already set
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    // Log error for internal monitoring (could be replaced with a logger like Winston)
    console.error(`[API Error] ${req.method} ${req.url}: ${err.message}`);

    // Customize response based on error type
    const errorResponse = {
        success: false,
        message: err.message || "An unexpected error occurred",
        stack: process.env.NODE_ENV === "production" ? undefined : err.stack
    };

    // Specific handling for DB validation errors
    if (err.name === "ValidationError") {
        return res.status(400).json({
            ...errorResponse,
            message: "Validation Error",
            errors: Object.values(err.errors).map(e => e.message)
        });
    }

    // Handle invalid ObjectId errors
    if (err.name === "CastError") {
        return res.status(400).json({
            ...errorResponse,
            message: `Resource not found: Invalid ${err.path}`
        });
    }

    // Handle duplicate key error (MongoDB code 11000)
    if (err.code === 11000) {
        return res.status(400).json({
            ...errorResponse,
            message: "Duplicate field value entered"
        });
    }

    res.status(statusCode).json(errorResponse);
};