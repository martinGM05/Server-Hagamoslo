import { Router } from 'express';
import validateJWT from '../middlewares/ValidateJWT';
import HiredController from '../controller/HiredController';

const router = Router();

// Hire a service
router.post('/', HiredController.createServiceHired);

// Update the status of a service
router.put('/:idServiceHired', HiredController.updateStatusService);

// Get services depending on the status
router.get('/:idUser/:status', HiredController.getServiceHired);

// Get services depending on the status of the worker
router.get('/worker/:idWorker/:status', HiredController.getServiceWorkerHired);




export default router;