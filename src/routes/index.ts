import {Router} from 'express';
import user from './user.route';
import equipo from './equipo.route';

const router = Router();

router.use('/user', user);
router.use('/team', equipo);

export default router;