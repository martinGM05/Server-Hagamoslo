import { Router } from 'express';
import { getAllUsersClient, getWorkerUser, putRoleWorker } from '../controller/WorkerControllers';
import validateJWT from '../middlewares/ValidateJWT';

const router = Router();

router.get('/', [
    // validateJWT,
],getAllUsersClient);

router.get('/:id', [
    // validateJWT,
], getWorkerUser);

router.put('/:idUser', [
    // validateJWT,
],putRoleWorker);

export default router;