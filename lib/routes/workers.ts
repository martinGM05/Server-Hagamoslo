import { Router } from 'express';
import { getAllUsersClient, changeRoleWorker } from '../controller/WorkerControllers';

const router = Router();

router.get('/', getAllUsersClient);
router.put('/:idUser', changeRoleWorker);

export default router;