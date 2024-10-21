// note.routes.ts
import { Router } from 'express';
import { createNote, getAllNotes, updateNote, deleteNote } from '../controllers/note.controller';

const router = Router();

// CRUD operations
router.post('/', createNote);           // Create a new note
router.get('/', getAllNotes);           // Get all notes
router.put('/:id', updateNote);         // Update a note by ID
router.delete('/:id', deleteNote);      // Delete a note by ID

export default router;
