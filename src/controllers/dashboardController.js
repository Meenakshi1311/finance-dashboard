import { getSummary } from "../services/dashboardService.js";

export const summary = async (req, res) => {
    const data = await getSummary();
    res.json(data);
};