// note.controller.ts
import { Request, Response } from 'express';
import Note from '../models/note.model'; // Ensure this path is correct

export const createNote = async (req: Request, res: Response) => {
    const { title, content } = req.body;

    try {
        const newNote = new Note({
            title,
            content,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        await newNote.save();
        res.status(201).json({ message: 'Note created', note: newNote });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const getAllNotes = async (req: Request, res: Response) => {
    try {
        const notes = await Note.find();
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const updateNote = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, content } = req.body;

    try {
        const updatedNote = await Note.findByIdAndUpdate(id, { title, content, updatedAt: new Date() }, { new: true });
        if (!updatedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.status(200).json({ message: 'Note updated', note: updatedNote });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const deleteNote = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const deletedNote = await Note.findByIdAndDelete(id);
        if (!deletedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.status(200).json({ message: 'Note deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
