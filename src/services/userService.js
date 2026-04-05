import User from "../models/User.js";

/**
 * Service to register a new user in the system.
 */
export const createUserService = async (userData) => {
    // Check if the user already exists by email
    const existingUser = await User.findOne({ email: userData.email.toLowerCase() });
    if (existingUser) throw new Error("A user with this email already exists");

    const user = await User.create(userData);
    return user;
};

/**
 * Service to get all users (admin only logic handled in routing).
 */
export const getAllUsersService = async (filter = {}) => {
    const users = await User.find(filter).sort("-createdAt");
    return users;
};

/**
 * Service to get a user by their unique ID.
 */
export const getUserByIdService = async (id) => {
    const user = await User.findById(id);
    if (!user) throw new Error("User not found");
    return user;
};

/**
 * Service to update user details.
 */
export const updateUserService = async (id, updateData) => {
    const user = await User.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    if (!user) throw new Error("User not found to update");
    return user;
};

/**
 * Service to delete a user profile.
 */
export const deleteUserService = async (id) => {
    const user = await User.findByIdAndDelete(id);
    if (!user) throw new Error("User not found to delete");
    return { message: "User deleted successfully" };
};
