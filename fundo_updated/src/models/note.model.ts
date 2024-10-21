// note.model.ts
import { Document, Schema, model } from 'mongoose';

export interface INote extends Document {
    _id: string; // Optional, as Mongoose can handle this for you
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

const NoteSchema: Schema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Create and export the Mongoose model
const Note = model<INote>('Note', NoteSchema);
export default Note;
