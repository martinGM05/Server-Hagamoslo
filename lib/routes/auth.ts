import { Router } from 'express';
import { authenticateUser } from '../controller/AuthController';

const router = Router();

router.post('/', authenticateUser);


export default router;