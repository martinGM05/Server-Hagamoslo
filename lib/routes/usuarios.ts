import { Router } from 'express';
import { getUsuario, postUsuario, putUsuario } from '../controller/UsuariosController';
import validateJWT from '../middlewares/ValidateJWT';

const router = Router();

// router.get('/', getUsuarios);
router.get('/:id', [
    validateJWT,
], getUsuario);

router.post('/', [
    validateJWT,
],postUsuario);

router.put('/:id', [
    validateJWT,
], putUsuario);


export default router;