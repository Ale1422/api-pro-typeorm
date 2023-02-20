import { Router } from "express";
import { checkearJugadas, crearJugada, jugadasUsuario } from "../controllers/jugada.controller";
import { auth } from "../middlewares/auth.middleware";
import { schemaValidation } from "../middlewares/schemaValidator.middleware";
import { JugadaSchema } from "../schemas/jugada.schema";


const router = Router();

router.use(auth);
router.post('', schemaValidation(JugadaSchema), crearJugada);
router.get('', jugadasUsuario);
router.post('/check', checkearJugadas)

export default router