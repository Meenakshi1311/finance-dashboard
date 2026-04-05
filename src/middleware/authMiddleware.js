export const mockAuth = (req, res, next) => {
    req.user = {
        id: "507f1f77bcf86cd799439011",
        role: "admin" // change to test roles
    };
    next();
};