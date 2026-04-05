import Record from "../models/Record.js";

/**
 * Service to create a new financial record.
 */
export const createRecordService = async (recordData, userId) => {
    const record = await Record.create({ ...recordData, createdBy: userId });
    return record;
};

/**
 * Service to retrieve all records based on filters and ownership.
 */
export const getRecordsService = async (filter, user) => {
    // If the user's role is not admin, only show records they created
    if (user.role !== "admin") {
        filter.createdBy = user.id;
    }

    const records = await Record.find(filter).sort("-date");
    return records;
};

/**
 * Service to update an existing record if authorized.
 */
export const updateRecordService = async (id, updateData, user) => {
    const record = await Record.findById(id);
    if (!record) throw new Error("Record not found");

    // Only allow updating if the user is the owner or an admin
    if (user.role !== "admin" && record.createdBy.toString() !== user.id) {
        throw new Error("Unauthorized to update this record");
    }

    const updatedRecord = await Record.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    return updatedRecord;
};

/**
 * Service to delete a financial record if authorized.
 */
export const deleteRecordService = async (id, user) => {
    const record = await Record.findById(id);
    if (!record) throw new Error("Record not found");

    // Only allow deletion if the user is the owner or an admin
    if (user.role !== "admin" && record.createdBy.toString() !== user.id) {
        throw new Error("Unauthorized to delete this record");
    }

    await Record.findByIdAndDelete(id);
    return { message: "Deleted record successfully" };
};
