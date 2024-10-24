import { Request } from 'express';
import { IUser } from '../interfaces/user.interface'; // Correct im

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string; // Adjust this type based on your user model
                user?: IUser; // Add user property here// You can add more properties if needed, e.g., name, email, etc.
            };
        }
    }
  
}
