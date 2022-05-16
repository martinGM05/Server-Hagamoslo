import { Request, Response } from "express";

export const validateFileUpload = (req: Request, res: Response, next: VoidFunction) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({
            message: "No hay archivos que subir"
        });
    }   

    next();

}