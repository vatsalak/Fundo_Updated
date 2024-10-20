import { Router } from 'express';
import { registerUser,loginUser} from '../controllers/user.controller'; // Adjust the path accordingly
import { authenticate } from '../middlewares/auth.middleware';
const router = Router();

router.post('/register', registerUser); // Assuming you want to register at /api/v1/register
router.post('/login', loginUser);
export default router;
router.get('/protected-route', authenticate, (req, res) => {
    res.json({ message: 'Access granted to protected route' });
  });
  