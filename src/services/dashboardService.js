import Record from "../models/Record.js";
import mongoose from "mongoose";

/**
 * Service to aggregate dashboard summary for a specific user or all users (admin).
 */
export const getSummary = async (user) => {
    const matchStage = {};

    // Filter by user unless the requesting user is an admin
    if (user.role !== "admin") {
        matchStage.createdBy = new mongoose.Types.ObjectId(user.id);
    }

    const summaryData = await Record.aggregate([
        { $match: matchStage },
        {
            $group: {
                _id: null,
                totalIncome: {
                    $sum: { $cond: [{ $eq: ["$type", "income"] }, "$amount", 0] }
                },
                totalExpense: {
                    $sum: { $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0] }
                }
            }
        },
        {
            $project: {
                _id: 0,
                totalIncome: 1,
                totalExpense: 1,
                netBalance: { $subtract: ["$totalIncome", "$totalExpense"] }
            }
        }
    ]);

    // Return the aggregated result or zeroes if no data exists
    return summaryData[0] || {
        totalIncome: 0,
        totalExpense: 0,
        netBalance: 0
    };
};