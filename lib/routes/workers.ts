import { Router } from 'express';
import WorkerController from '../controller/WorkerControllers';

const router = Router();

router.get('/', WorkerController.getWorkersClients);

router.get('/:id', WorkerController.getWokerUser);

router.put('/:idUser', WorkerController.changeRoleWorker);

export default router;