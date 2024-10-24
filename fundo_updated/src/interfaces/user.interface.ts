import { Document } from 'mongoose';

export interface IUser extends Document {
    //_id: string;  // Ensure this is defined as required
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
