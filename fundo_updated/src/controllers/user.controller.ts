import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user.model'; // Ensure this path is correct
import { IUser } from '../interfaces/user.interface';
import { generateToken } from '../utils/generateToken'; // Import the function here

export const registerUser = async (req: Request, res: Response) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser: IUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });

        // Save the new user to the database
        await newUser.save();

        // Respond with a success message
        const token = generateToken(newUser._id);

        res.status(201).json({ message: 'User registered', token }); // Include the token in the response
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user: IUser | null = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email ' });
        }

        // Compare the password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalids password' });
        }

        // If login is successful, send a success message (you may also want to send back user data or a token)
       
        const token = generateToken(user._id.toString()); 
        res.status(200).json({
            message: 'Login successful',
            user: {
               
                firstName: user.firstName,
               
                email: user.email,
            },
            token
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
