import {Router} from 'express';
import user from './user.route';
import equipo from './equipo.route';
import partido from './partido.route'

const router = Router();

router.use('/user', user);
router.use('/team', equipo);
router.use('/game', partido)

export default router;