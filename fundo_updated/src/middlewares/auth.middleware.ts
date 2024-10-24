import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Define and export the AuthRequest interface
export interface AuthRequest extends Request {
  user?: { id: string }; // You can extend this with more user properties if needed
}

// Middleware to verify JWT
export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  // Get token from the Authorization header
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'Authorization token is required' });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }

    // Attach the user information to the request object
    req.user = { id: (decoded as any).id }; // Adjust according to your JWT payload structure

    next(); // Proceed to the next middleware or route handler
  });
};
