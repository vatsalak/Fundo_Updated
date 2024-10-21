// note.service.ts
import Note from '../models/note.model';
import { INote } from '../interfaces/note.interface';

export class NoteService {
    async createNote(data: INote) {
        const newNote = new Note(data);
        await newNote.save();
        return newNote;
    }

    async getAllNotes() {
        return await Note.find();
    }

    async updateNote(id: string, data: Partial<INote>) {
        return await Note.findByIdAndUpdate(id, data, { new: true });
    }

    async deleteNote(id: string) {
        return await Note.findByIdAndDelete(id);
    }
}

export default new NoteService();
