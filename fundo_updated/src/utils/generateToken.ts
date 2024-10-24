import jwt from 'jsonwebtoken';

/**
 * Function to generate a JWT token for a user
 * 
 * @param {string} userId - The user ID to encode in the token
 * @returns {string} - The signed JWT token
 * @throws {Error} - If token generation fails
 */
export const generateToken = (userId: string): string => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT secret is not defined in environment variables');
  }

  try {
    return jwt.sign({ id: userId }, secret, { expiresIn: '1h' });
  } catch (error) {
    // Type guard to check if error is an instance of Error
    if (error instanceof Error) {
      // Handle the specific error type
      throw new Error(`Token generation failed: ${error.message}`);
    } else {
      // If it's not an instance of Error, throw a generic error message
      throw new Error('Token generation failed due to an unknown error');
    }
  }
};
