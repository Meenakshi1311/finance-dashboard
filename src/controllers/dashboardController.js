import { getSummary } from "../services/dashboardService.js";

/**
 * Controller to fetch the dashboard summary for the current user.
 */
export const summary = async (req, res, next) => {
    try {
        const data = await getSummary(req.user);
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};