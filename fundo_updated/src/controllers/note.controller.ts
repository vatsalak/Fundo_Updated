import { Request, Response } from 'express';
import Note from '../models/note.model'; // Ensure this path is correct
import { INote } from '../interfaces/note.interface';
import * as NoteService from '../services/note.service'; // Adjust the import path as needed


// Create a new note
export const createNote = async (req: Request, res: Response) => {
    const { title, content } = req.body;

    try {
        // Create a new note using the service
        const newNote: INote = await NoteService.createNote({
            title,
            content,
        });

        res.status(201).json({ message: 'Note created successfully', note: newNote });
    } catch (error) {
        res.status(500).json({ message: 'Error creating note', error });
    }
};

// Get all notes
export const getNotes = async (req: Request, res: Response) => {
    try {
        const notes = await Note.find();
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching notes', error });
    }
};

// Get a single note by ID
export const getNoteById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const note = await Note.findById(id);
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching note', error });
    }
};

// Update a note by ID
export const updateNote = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, content } = req.body;

    try {
        const updatedNote = await Note.findByIdAndUpdate(
            id,
            { title, content, updatedAt: new Date() },
            { new: true } // Return the updated document
        );

        if (!updatedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }

        res.status(200).json({ message: 'Note updated successfully', note: updatedNote });
    } catch (error) {
        res.status(500).json({ message: 'Error updating note', error });
    }
};

// Delete a note by ID
export const deleteNote = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const deletedNote = await Note.findByIdAndDelete(id);

        if (!deletedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }

        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting note', error });
    }
};
export const archiveNote = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const note: INote | null = await Note.findById(id);
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        // Update the note to set archived to true
        note.archived = true;
        await note.save();

        res.status(200).json({ message: 'Note archived successfully', note });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Trash a note by ID
export const trashNote = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const note: INote | null = await Note.findById(id);
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        // Update the note to set trashed to true
        note.trashed = true;
        await note.save();

        res.status(200).json({ message: 'Note trashed successfully', note });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Optionally, you can create methods to get archived or trashed notes
export const getArchivedNotes = async (req: Request, res: Response) => {
    try {
        const archivedNotes = await Note.find({ archived: true });
        res.status(200).json(archivedNotes);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const getTrashedNotes = async (req: Request, res: Response) => {
    try {
        const trashedNotes = await Note.find({ trashed: true });
        res.status(200).json(trashedNotes);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};