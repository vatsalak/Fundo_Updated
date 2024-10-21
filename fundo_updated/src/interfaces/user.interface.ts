import { Document } from 'mongoose';
export interface IUser extends Document {
  _id: string | number; // Optional, as Mongoose can handle this for you
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  
}