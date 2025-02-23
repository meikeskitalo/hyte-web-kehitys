import express from 'express';
import {getEntries, postEntry, updateEntryById, deleteEntryById} from '../controllers/entry-controller.js';
import {authenticateToken} from '../middlewares/authentication.js';

const entryRouter = express.Router();

// post to /api/entries
entryRouter
  .route('/')
  .post(authenticateToken, postEntry)
  .get(authenticateToken, getEntries);

entryRouter
  .route('/:id')
  .put(authenticateToken, updateEntryById)
  .delete(authenticateToken, deleteEntryById);

export default entryRouter;
