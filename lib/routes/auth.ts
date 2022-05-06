import { Router } from 'express';
import { authenticateUser } from '../controller/AuthController';

const router = Router();

router.get('/', authenticateUser);


export default router;