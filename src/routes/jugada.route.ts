import { Router } from "express";
import { checkearJugadas, crearJugada, jugadasUsuario } from "../controllers/jugada.controller";
import { auth } from "../middlewares/auth.middleware";


const router = Router();

router.use(auth);
router.post('',crearJugada);
router.get('', jugadasUsuario);
router.post('/check', checkearJugadas)

export default router