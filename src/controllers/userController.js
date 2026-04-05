import {
    createUserService,
    getAllUsersService,
    getUserByIdService,
    updateUserService,
    deleteUserService
} from "../services/userService.js";

/**
 * Controller to create a new user.
 */
export const createUser = async (req, res, next) => {
    try {
        const user = await createUserService(req.body);
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};

/**
 * Controller to fetch all users (admin restricted).
 */
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await getAllUsersService(req.query);
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

/**
 * Controller to fetch a single user by ID.
 */
export const getUserById = async (req, res, next) => {
    try {
        const user = await getUserByIdService(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

/**
 * Controller to update user details.
 */
export const updateUser = async (req, res, next) => {
    try {
        const user = await updateUserService(req.params.id, req.body);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

/**
 * Controller to delete a user profile.
 */
export const deleteUser = async (req, res, next) => {
    try {
        const result = await deleteUserService(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};