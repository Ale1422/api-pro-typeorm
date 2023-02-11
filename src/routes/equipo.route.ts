import {Router} from 'express'
import { createTeam } from '../controllers/equipo.controller';
import { schemaValidation } from '../middlewares/schemaValidator.middleware';
import { EquipoSchema } from '../schemas/equipo.schema';

const router = Router();

router.post('/create', schemaValidation(EquipoSchema),createTeam);

export default router;