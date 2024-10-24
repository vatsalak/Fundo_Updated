// note.interface.ts



import { Schema, model, Document, Types } from 'mongoose';

// Define the INote interface with ObjectId for createdBy
export interface INote extends Document {
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  archived: boolean;
  trashed: boolean;
  createdBy: Types.ObjectId; // Use Types.ObjectId instead of ObjectId
}
