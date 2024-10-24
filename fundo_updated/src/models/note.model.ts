import { Schema, model, Document, Types } from 'mongoose';

// Note interface that extends Document from Mongoose
export interface INote extends Document {
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  archived: boolean;
  trashed: boolean;
  createdBy: Types.ObjectId; // Use Types.ObjectId instead of just ObjectId
}

// Schema definition for the Note model
const noteSchema = new Schema<INote>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    archived: { type: Boolean, default: false },
    trashed: { type: Boolean, default: false },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Refers to User model
  },
  { timestamps: true }
);

// Export the Note model
export default model<INote>('Note', noteSchema);
