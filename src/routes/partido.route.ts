import { Router } from "express";
import { actualizarPartido, getAll, nuevoPartido } from "../controllers/partido.controller";
import { auth } from "../middlewares/auth.middleware";
import { schemaValidation } from "../middlewares/schemaValidator.middleware";
import { ActualizarPartidoSchema, NuevoPartidoSchema } from "../schemas/partido.schema";

const router = Router();

router.get('', getAll);
router.use(auth);
router.post('', schemaValidation(NuevoPartidoSchema), nuevoPartido);
router.patch('', schemaValidation(ActualizarPartidoSchema), actualizarPartido);

export default router;