import { Request, Response } from "express";
import SalaService from "../service/SalaService";


export const createSala = async (req: Request, res: Response) => {
    
    const { idSala, idUsuario, idTrabajador } = req.body;
    const sala = await SalaService.createSala(idSala, idUsuario, idTrabajador);
    if (sala) {
        res.status(200).json(sala)
    }else{
        res.status(400).json({ message: 'No se pudo crear la sala' })
    }
}

export const getSalasByIdUser = async (req: Request, res: Response) => {
    const { idUsuario } = req.params;
    const salas = await SalaService.getSalasByIdUser(Number(idUsuario));
    if (salas) {
        res.status(200).json(salas)
    }else{
        res.status(400).json({ message: 'No se pudo obtener las salas' })
    }
}

export const deleteSalas = async (req: Request, res: Response) => {
    const { idSala } = req.params;
    const sala = await SalaService.deleteSala(idSala);
    if (sala) {
        res.status(200).json(sala)
    }else{
        res.status(400).json({ message: 'No se pudo eliminar la sala' })
    }
}