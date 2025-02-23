import {insertEntry, selectEntriesByUserId, modifyEntryByEntryIdAndUserId, deleteEntryByEntryIdAndUserId} from '../models/entry-model.js';

const postEntry = async (req, res) => {
  // user_id, entry_date, mood, weight, sleep_hours, notes
  try {
    const newEntry = req.body;
    newEntry.user_id = req.user.user_id;
    insertEntry(newEntry);
    res.status(201).json({message: "Entry added."});
  }
  catch (error) {
    console.error(error.message);
    res.status(400).json({message: 'DB error: ' + error.message});
  }

};

const updateEntryById = async (req, res) => {
  const entryId = req.params.id;
  const userId = req.user.user_id;
  const updatedEntry = req.body;
  const result = await modifyEntryByEntryIdAndUserId(entryId, userId, updatedEntry);
  if (result) {
    res.json({message: 'Entry updated'});
  } else {
    res.status(404).json({message: 'EntryId not found for user'});
  }
};

const deleteEntryById = async (req, res) => {
  const entryId = req.params.id;
  const userId = req.user.user_id;
  const result = await deleteEntryByEntryIdAndUserId(entryId, userId);
  if (result) {
    res.json({message: 'Entry deleted'});
  } else {
    res.status(404).json({message: 'EntryId not found for user'});
  }
};

/**
 * Get all entries of the logged in user
 * @param {*} req
 * @param {*} res
 */
const getEntries = async (req, res) => {
  const entries = await selectEntriesByUserId(req.user.user_id);
  res.json(entries);
};

export {postEntry, getEntries, updateEntryById, deleteEntryById};
