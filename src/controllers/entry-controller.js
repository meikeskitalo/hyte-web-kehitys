import { customError } from '../middlewares/error-handler.js';
import {insertEntry, selectEntriesByUserId, modifyEntryByEntryIdAndUserId, deleteEntryByEntryIdAndUserId} from '../models/entry-model.js';

const postEntry = async (req, res, next) => {
  // user_id, entry_date, mood, weight, sleep_hours, notes
  const newEntry = req.body;
  newEntry.user_id = req.user.user_id;
  try {
    await insertEntry(newEntry);
    res.status(201).json({message: "Entry added."});
  } catch (error) {
    next(error);
  }
};

/**
 * Get all entries of the logged in user
 * @param {*} req
 * @param {*} res
 */
const getEntries = async (req, res, next) => {
  try {
    const entries = await selectEntriesByUserId(req.user.user_id);
    res.json(entries);
  } catch (error) {
    next(error);
  }
};

const updateEntryById = async (req, res, next) => {
  const entryId = req.params.id;
  const userId = req.user.user_id;
  const updatedEntry = req.body;

  try {
    const result = await modifyEntryByEntryIdAndUserId(entryId, userId, updatedEntry);
    res.json({message: 'Entry updated: ' + result});
  } catch (error) {
    next(customError('EntryId not found for user: ' + error.message, 404));
  }
};

const deleteEntryById = async (req, res, next) => {
  const entryId = req.params.id;
  const userId = req.user.user_id;

  try {
    const result = await deleteEntryByEntryIdAndUserId(entryId, userId);
    res.json({message: 'Entry deleted: ' + result});
  } catch (error) {
    next(customError('EntryId not found for user: ' + error.message, 404));
  }
};

export {postEntry, getEntries, updateEntryById, deleteEntryById};
