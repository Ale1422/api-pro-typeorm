import { Router } from "express";
import { actualizarPartido, getAll, nuevoPartido } from "../controllers/partido.controller";
import { auth } from "../middlewares/auth.middleware";
import { schemaValidation } from "../middlewares/schemaValidator.middleware";
import { partidoSchema } from "../schemas/partido.schema";

const router = Router();

router.get('', getAll);
router.use(auth);
router.post('', schemaValidation(partidoSchema), nuevoPartido);
router.patch('', actualizarPartido);

export default router;