import { Router } from 'express';
import { getServices, getWorkesByTag, postAssignment } from '../controller/TagController';
import validateJWT from '../middlewares/ValidateJWT';

const router = Router();

router.get('/', [
    // validateJWT,
], getServices);

router.get('/:idTag', [
    // validateJWT,
], getWorkesByTag);

router.post('/', [
    // validateJWT,
], postAssignment)


export default router;