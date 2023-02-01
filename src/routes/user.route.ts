import {Router} from 'express';
import {loginUser, registerUser} from '../contollers/user.controller'

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;