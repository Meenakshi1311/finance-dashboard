import Record from "../models/Record.js";

export const createRecord = async (req, res) => {
    const record = await Record.create({ ...req.body, createdBy: req.user.id });
    res.json(record);
};

export const getRecords = async (req, res) => {
    const { type, category } = req.query;

    let filter = {};
    if (type) filter.type = type;
    if (category) filter.category = category;

    const records = await Record.find(filter);
    res.json(records);
};

export const updateRecord = async (req, res) => {
    const record = await Record.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(record);
};

export const deleteRecord = async (req, res) => {
    await Record.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
};