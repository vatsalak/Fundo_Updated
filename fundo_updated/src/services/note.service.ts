// src/services/note.service.ts
import Note from '../models/note.model'; // Adjust the import based on your folder structure
import { INote } from '../interfaces/note.interface'; // Adjust the import based on your folder structure

// Create a new note
export interface CreateNoteInput {
    title: string;
    content: string;
    createdBy: string;
}

// Create a new note and save it to the database
export const createNote = async (input: CreateNoteInput): Promise<INote> => {
    const newNote = new Note({
        title: input.title,
        content: input.content,
        createdBy: input.createdBy, // Now you can set createdBy
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    return await newNote.save();
};




// Get all notes
export const getAllNotes = async () => {
    return await Note.find({});
};

// Update a note
export const updateNote = async (id: string, data: Partial<INote>) => {
    return await Note.findByIdAndUpdate(id, data, { new: true });
};

// Delete a note
export const deleteNote = async (id: string) => {
    return await Note.findByIdAndDelete(id);
};

// Archive a note
export const archiveNote = async (id: string) => {
    return await Note.findByIdAndUpdate(id, { archived: true }, { new: true });
};

// Trash a note
export const trashNote = async (id: string) => {
    return await Note.findByIdAndUpdate(id, { trashed: true }, { new: true });
};

// Get archived notes
export const getArchivedNotes = async () => {
    return await Note.find({ archived: true });
};

// Get trashed notes
export const getTrashedNotes = async () => {
    return await Note.find({ trashed: true });
};