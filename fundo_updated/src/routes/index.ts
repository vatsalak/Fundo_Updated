import { Router } from 'express';
import { registerUser,loginUser} from '../controllers/user.controller'; // Adjust the path accordingly

const router = Router();

router.post('/register', registerUser); // Assuming you want to register at /api/v1/register
router.post('/login', loginUser);
export default router;
