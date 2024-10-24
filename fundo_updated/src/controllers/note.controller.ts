import { Request, Response } from 'express';
import Note from '../models/note.model';
import { AuthRequest } from '../middlewares/auth.middleware';
import mongoose from 'mongoose'; // Ensure mongoose is imported

// Create a new note
export const createNote = async (req: AuthRequest, res: Response) => {
  try {
    const { title, content } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const newNote = new Note({
      title,
      content,
      createdBy: new mongoose.Types.ObjectId(userId), // Use Types.ObjectId here
    });

    const savedNote = await newNote.save();
    return res.status(201).json(savedNote);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating note', error });
  }
};

// Get all notes of the logged-in user
export const getNotes = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(400).json({ message: 'User ID not found in request' });
    }

    const notes = await Note.find({ createdBy: new mongoose.Types.ObjectId(userId) }); // Use Types.ObjectId
    return res.status(200).json(notes);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching notes', error });
  }
};

// Update a specific note
export const updateNote = async (req: AuthRequest, res: Response) => {
  try {
    const { noteId } = req.params;
    const { title, content, archived, trashed } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const updatedNote = await Note.findOneAndUpdate(
      { _id: noteId, createdBy: new mongoose.Types.ObjectId(userId) },
      { title, content, archived, trashed },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: 'Note not found or you are not authorized to update this note' });
    }

    return res.status(200).json(updatedNote);
  } catch (error) {
    return res.status(500).json({ message: 'Error updating note', error });
  }
};

// Delete a specific note
export const deleteNote = async (req: AuthRequest, res: Response) => {
  try {
    const { noteId } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const deletedNote = await Note.findOneAndDelete({
      _id: noteId,
      createdBy: new mongoose.Types.ObjectId(userId),
    });

    if (!deletedNote) {
      return res.status(404).json({ message: 'Note not found or you are not authorized to delete this note' });
    }

    return res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting note', error });
  }
};
