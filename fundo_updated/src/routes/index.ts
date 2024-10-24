import { Router } from 'express';
import { registerUser,loginUser} from '../controllers/user.controller'; // Adjust the path accordingly
import { verifyToken } from '../middlewares/auth.middleware';
import { createNote } from '../controllers/note.controller';
const router = Router();

router.post('/register', registerUser); // Assuming you want to register at /api/v1/register
router.post('/login', loginUser);
router.post('/notes', verifyToken, createNote); // Ensure authenticate is used here


export default router;