import { Request, Response } from "express";
import BlogsService from "../service/BlogsService";

class BlogController {

    static getAllBlogs = async (req: Request, res: Response) => {
        const blogs = await BlogsService.getAllBlogs();
        res.json(blogs);
    }

    static getBlogById = async (req: Request, res: Response) => {
        const { id } = req.params;
        const blog = await BlogsService.getBlogById(Number(id));
        if (blog) {
            res.status(200).json(blog);
        } else {
            res.status(404).json({ message: "Blog no encontrado" });
        }
    }

    static createBlog = async (req: Request, res: Response) => {
        const { body } = req;
        const blog = await BlogsService.createBlog(body);
        if (blog) {
            res.status(201).json({
                message: "Blog creado"
            });
        } else {
            res.status(500).json({ message: "Error al crear el blog" });
        }
    }

    static deleteBlog = async (req: Request, res: Response) => {
        const { id } = req.params;
        const blog = await BlogsService.deleteBlog(Number(id));
        if (blog) {
            res.status(200).json({
                message: "Blog eliminado"
            });
        } else {
            res.status(500).json({ message: "Error al eliminar el blog" });
        }
    }


}

export default BlogController;