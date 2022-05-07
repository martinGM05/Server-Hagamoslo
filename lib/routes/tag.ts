import { Router } from 'express';
import { getServices, getWorkesByTag } from '../controller/TagController';
import validateJWT from '../middlewares/ValidateJWT';

const router = Router();

router.get('/', [
    validateJWT,
], getServices);

router.get('/:idTag', [
    validateJWT,
], getWorkesByTag);


export default router;