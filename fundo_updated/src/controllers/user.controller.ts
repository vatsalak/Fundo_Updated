import { Request, Response } from 'express';
//import bcrypt from 'bcryptjs';
import User from '../models/user.model'; // Ensure this path is correct
import { IUser } from '../interfaces/user.interface';

export const registerUser = async (req: Request, res: Response) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
   //     const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser: IUser = new User({
            firstName,
            lastName,
            email,
            password //hashedPassword,
        });

        // Save the new user to the database
        await newUser.save();

        // Respond with a success message
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

