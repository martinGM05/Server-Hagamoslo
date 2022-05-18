import { Router } from 'express';
import { createSala, deleteSalas, getSalasByIdUser } from '../controller/SalaController';
import validateJWT from '../middlewares/ValidateJWT';

const router = Router();

router.post('/', createSala)
router.get('/:idUsuario', getSalasByIdUser)
router.delete('/:idSala', deleteSalas)

export default router;