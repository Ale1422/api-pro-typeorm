import {Router} from 'express';
import {getUser, loginUser, registerUser, setUserAdmin} from '../controllers/user.controller'
import { auth } from '../middlewares/auth.middleware';
import { schemaValidation } from '../middlewares/schemaValidator.middleware';
import { LoginSchema, RegisterSchema } from '../schemas/user.schema';

const router = Router();

router.post('/register',schemaValidation(RegisterSchema), registerUser);
router.post('/login',schemaValidation(LoginSchema), loginUser);
router.use(auth);
router.get('/admin', setUserAdmin)
router.get('/:id', getUser);

export default router;