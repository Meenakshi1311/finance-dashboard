import {
    createRecordService,
    getRecordsService,
    updateRecordService,
    deleteRecordService
} from "../services/recordService.js";

/**
 * Controller to create a new record.
 */
export const createRecord = async (req, res, next) => {
    try {
        const record = await createRecordService(req.body, req.user.id);
        res.status(201).json(record);
    } catch (error) {
        next(error);
    }
};

/**
 * Controller to fetch records with optional filtering.
 */
export const getRecords = async (req, res, next) => {
    try {
        const records = await getRecordsService(req.query, req.user);
        res.status(200).json(records);
    } catch (error) {
        next(error);
    }
};

/**
 * Controller to update an existing record.
 */
export const updateRecord = async (req, res, next) => {
    try {
        const record = await updateRecordService(req.params.id, req.body, req.user);
        res.status(200).json(record);
    } catch (error) {
        next(error);
    }
};

/**
 * Controller to delete a record.
 */
export const deleteRecord = async (req, res, next) => {
    try {
        const result = await deleteRecordService(req.params.id, req.user);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};