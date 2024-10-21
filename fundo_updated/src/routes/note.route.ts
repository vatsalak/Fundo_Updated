import { Router } from 'express';
import { createNote, getNotes, updateNote, deleteNote, archiveNote, trashNote, getArchivedNotes, getTrashedNotes } from '../controllers/note.controller';

const router = Router();

// CRUD operations
router.post('/', createNote);           // Create a new note
router.get('/', getNotes);           // Get all notes
router.put('/:id', updateNote);         // Update a note by ID
router.delete('/:id', deleteNote);      // Delete a note by ID
router.put('/:id/archive', archiveNote); // Archive a note
router.put('/:id/trash', trashNote);     // Trash a note
router.get('/archived', getArchivedNotes); // Get all archived notes
router.get('/trashed', getTrashedNotes);   // Get all trashed notes

export default router;
