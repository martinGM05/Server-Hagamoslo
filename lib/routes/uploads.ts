import { Request, Router } from 'express';
import { uploadImage, updateImage, viewImage } from '../controller/UploadController';
import validateJWT from '../middlewares/ValidateJWT';
import { validateFileUpload } from '../middlewares/ValidateFile';

const router = Router();

router.get('/:carpeta/:id', viewImage);

router.post('/', [
    validateFileUpload
],uploadImage);

router.put('/:carpeta/:id', [
    validateFileUpload
], updateImage)

export default router;