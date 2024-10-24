import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

const userSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // Unique email validation
  password: { type: String, required: true },
}, { timestamps: true });

export default model<IUser>('User', userSchema);
