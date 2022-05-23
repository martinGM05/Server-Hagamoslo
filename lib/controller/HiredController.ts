import { Request, Response } from "express";
import { getServiceHired, createServiceHired } from "../service/Hired";

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

export const createServiceHire = async (req: Request, res: Response) => {
    const { body } = req
    const service = await createServiceHired(body)
    if (service) {
        res.status(200).json(service)
    }else{
        res.status(500).json({ message: 'Error al contratar el servicio' })
    }
}