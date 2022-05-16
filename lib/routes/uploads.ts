import { Request, Router } from 'express';
import { uploadImage, updateImage } from '../controller/UploadController';
import validateJWT from '../middlewares/ValidateJWT';
import { validateFileUpload } from '../middlewares/ValidateFile';

const router = Router();


router.post('/', [
    validateFileUpload
],uploadImage);

router.put('/:carpeta/:id', [
    validateFileUpload
], updateImage)

export default router;