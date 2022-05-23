import { Request, Router } from 'express';
import ComentarioBlogController from '../controller/ComentarioBlogController';
const router = Router();

router.get('/:id', [
    // validateJWT,
], ComentarioBlogController.getAllComentarios);

router.post('/', ComentarioBlogController.createComentarioBlog);


export default router;