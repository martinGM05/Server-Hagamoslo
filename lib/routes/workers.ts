import { Router } from 'express';
import { getAllUsersClient, putRoleWorker } from '../controller/WorkerControllers';
import validateJWT from '../middlewares/ValidateJWT';

const router = Router();

router.get('/', [
    validateJWT,
],getAllUsersClient);

router.put('/:idUser', [
    validateJWT,
],putRoleWorker);

export default router;