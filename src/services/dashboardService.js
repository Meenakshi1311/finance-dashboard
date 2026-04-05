import Record from "../models/Record.js";

export const getSummary = async () => {
    const income = await Record.aggregate([
        { $match: { type: "income" } },
        { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    const expense = await Record.aggregate([
        { $match: { type: "expense" } },
        { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    return {
        totalIncome: income[0]?.total || 0,
        totalExpense: expense[0]?.total || 0,
        netBalance: (income[0]?.total || 0) - (expense[0]?.total || 0)
    };
};