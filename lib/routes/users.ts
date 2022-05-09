import { Router } from 'express';
import { getUsers, getUsuario, postUsuario, putUsuario } from '../controller/UsuariosController';
import validateJWT from '../middlewares/ValidateJWT';

const router = Router();

router.get('/', [
    validateJWT,
],getUsers);

router.get('/:id', [
    validateJWT,
], getUsuario);

router.post('/', postUsuario);

router.put('/:id', [
    validateJWT,
], putUsuario);


export default router;