import { Router } from 'express';
import { getUsuario, getUsuarios, postUsuario, putUsuario } from '../controller/UsuariosController';

const router = Router();

router.get('/', getUsuarios);
router.get('/:id', getUsuario);
router.post('/', postUsuario);
router.put('/:id', putUsuario);


export default router;