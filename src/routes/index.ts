import {Router} from 'express';
import user from './user.route';
import equipo from './equipo.route';
import partido from './partido.route'
import jugada from './jugada.route'

const router = Router();

router.use('/user', user);
router.use('/team', equipo);
router.use('/game', partido)
router.use('/move', jugada);

export default router;