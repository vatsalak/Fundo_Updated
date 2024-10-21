import { Router } from 'express';
import { registerUser } from '../controllers/user.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.post('/register', registerUser);

export default router;
router.get('/protected-route', authenticate, (req, res) => {
    res.json({ message: 'Access granted to protected route' });
  });
  