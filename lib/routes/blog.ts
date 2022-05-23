import { Request, Router } from 'express';
import BlogController from '../controller/BlogController';
const router = Router();

router.get('/', BlogController.getAllBlogs);

router.get('/:id', [
    // validateJWT,
], BlogController.getBlogById);

router.post('/', BlogController.createBlog);

router.delete('/:id', BlogController.deleteBlog);

export default router;