import {addEntry, findEntryById, listAllEntries, updateEntry} from "../models/entry-model.js";

const getEntries = async (req, res) => {
  const entries = await listAllEntries();
  res.json(entries);
};

const getEntryById = async (req, res) => {
  const entry = await findEntryById(req.params.id);
  if (entry) {
    res.json(entry);
  } else {
    res.sendStatus(404);
  }
};

const postEntry = (req, res) => {
  const {user_id, entry_date, mood, weight, sleep_hours, notes} = req.body;
  // validate input, ensure required fields are present
  if (entry_date && (weight || mood || sleep_hours || notes) && user_id) {
    addEntry(req.body);
    res.status(201);
    res.json({message: 'New entry added.'})
  } else {
    res.sendStatus(400);
  }
};

const putEntry = async (req, res) => {
  const mood = req.body.mood;
  const id = req.params.id;
  // validate input, ensure required fields are present
  if (mood && id) {
    const result = await updateEntry(id, mood);
    console.log(result)
    res.status(200);
    res.json({message: 'Diary entry updated.'})
  } else {
    res.sendStatus(400);
  }
};

const deleteEntry = (req, res) => {
  // not implemented yet with the mock data
  res.sendStatus(200);
};

export {getEntries, getEntryById, postEntry, putEntry, deleteEntry};
