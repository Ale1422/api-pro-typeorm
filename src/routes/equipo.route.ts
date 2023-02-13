import {Router} from 'express'
import { createTeam, getAll } from '../controllers/equipo.controller';
import { auth } from '../middlewares/auth.middleware';
import { schemaValidation } from '../middlewares/schemaValidator.middleware';
import { EquipoSchema } from '../schemas/equipo.schema';

const router = Router();

router.get('', getAll);
router.use(auth)
router.post('', schemaValidation(EquipoSchema),createTeam);

export default router;