export const mockAuth = (req, res, next) => {
    req.user = {
        id: "123",
        role: "admin" // change to test roles
    };
    next();
};