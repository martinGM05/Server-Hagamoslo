import { Router } from 'express';
import validateJWT from '../middlewares/ValidateJWT';
import { createServiceHire, getServiceHiredHistory, getServiceHiredInCourse } from '../controller/HiredController';

const router = Router();

router.get('/inCourse/:idUser', [
    // validateJWT,
], getServiceHiredInCourse);

router.post('/', createServiceHire);

router.get('/history/:idUser', [
    // validateJWT,
], getServiceHiredHistory);


export default router;