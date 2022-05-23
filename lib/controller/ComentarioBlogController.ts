import { Request, Response } from "express";
import ComentarioBlogService from "../service/ComentarioBlogService";

class ComentarioBlogController {

    static getAllComentarios = async (req: Request, res: Response) => {
        const { id } = req.params;
        const comentarios = await ComentarioBlogService.getComentariosBlog(Number(id));
        if (comentarios) {
            res.status(200).json(comentarios);
        } else {
            res.status(404).json({ message: "Blog no encontrado" });
        }
    }

    static createComentarioBlog = async (req: Request, res: Response) => {
        const { body } = req;
        const comentarioBlog = await ComentarioBlogService.createComentarioBlog(body);
        if (comentarioBlog) {
            res.status(201).json({
                message: "Comentario creado"
            });
        } else {
            res.status(500).json({ message: "Error al crear el comentario" });
        }
    }

}

export default ComentarioBlogController;