import { Router } from 'express';
import { registerUser, loginUser, getUserById } from '../controllers/user.controller'; // Adjust the path as necessary
import { verifyToken } from '../middlewares/auth.middleware'; // Ensure you have the JWT middleware

const router = Router();

// Route for user registration
router.post('/register', registerUser);

// Route for user login
router.post('/login', loginUser);

// Route for fetching user details by ID (protected)
router.get('/:id', verifyToken, getUserById);

// Export the router
export default router;
