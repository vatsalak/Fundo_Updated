import { Router } from 'express';
import { createNote, getNotes, updateNote, deleteNote } from '../controllers/note.controller';
import { verifyToken } from '../middlewares/auth.middleware'; // Adjust the import as necessary

const router = Router();

router.post('/', verifyToken, createNote); // Create a note
router.get('/', verifyToken, getNotes); // Get notes
router.put('/:noteId', verifyToken, updateNote); // Update a note
router.delete('/:noteId', verifyToken, deleteNote); // Delete a note

export default router;
