import { Request, Router } from 'express';
import UsuariosControllers from '../controller/UsuariosController';
import validateJWT from '../middlewares/ValidateJWT';

const router = Router();

router.get('/', [
    // validateJWT,
], UsuariosControllers.getUsers);

router.get('/:id', [
    validateJWT,
], UsuariosControllers.getUsuario);

router.post('/', UsuariosControllers.postUsuario);

router.put('/:id', [
    validateJWT,
], UsuariosControllers.putUsuario);

export default router;