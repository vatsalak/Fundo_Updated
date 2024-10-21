// note.interface.ts
import { Document } from 'mongoose';

export interface INote extends Document {
    _id: string; // Optional, as Mongoose can handle this for you
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}