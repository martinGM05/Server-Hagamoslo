import { Router } from 'express';
import validateJWT from '../middlewares/ValidateJWT';
import { getServiceHiredHistory, getServiceHiredInCourse } from '../controller/HiredController';

const router = Router();

router.get('/inCourse/:idUser', [
    validateJWT,
], getServiceHiredInCourse);

router.get('/history/:idUser', [
    validateJWT,
], getServiceHiredHistory);


export default router;