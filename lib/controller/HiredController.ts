import { Request, Response } from "express";
import { getServiceHired } from "../service/Hired";

export const getServiceHiredInCourse = async (req: Request, res: Response) => {
    const idUser = req.params.idUser
    const services = await getServiceHired(Number(idUser), true)
    if (services.length > 0) {
        res.status(200).json(services)
    }else{
        res.status(200).json({ message: 'No hay servicios en curso' })
    }
}

export const getServiceHiredHistory = async (req: Request, res: Response) => {
    const idUser = req.params.idUser
    const services = await getServiceHired(Number(idUser), false)
    if (services.length > 0) {
        res.status(200).json(services)
    }else{
        res.status(200).json({ message: 'No hay servicios en el historial' })
    }
}