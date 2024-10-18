import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from '../interfaces/user.interface'; // Correct import path
// Define an interface for the user model that extends Mongoose's Document
export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// Define the schema for the User
const UserSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Create and export the Mongoose model
const newUser = mongoose.model<IUser>('User', UserSchema);
export default newUser;
