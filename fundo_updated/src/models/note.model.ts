import { Schema, model, Document } from 'mongoose';

export interface INote extends Document {
    _id: string; // Optional
    title: string;
    content: string|any;
    createdAt: Date;
    updatedAt: Date;
    archived: boolean; // New field
    trashed: boolean; // New field
}

const noteSchema = new Schema<INote>({
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    archived: { type: Boolean, default: false }, // Default is false
    trashed: { type: Boolean, default: false }, // Default is false
});

export default model<INote>('Note', noteSchema);
