import {Router} from 'express';
import {getUser, loginUser, registerUser, setUserAdmin} from '../contollers/user.controller'
import { auth } from '../midlewares/auth';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/:id', auth, getUser);
router.get('/admin', auth, setUserAdmin)

export default router;