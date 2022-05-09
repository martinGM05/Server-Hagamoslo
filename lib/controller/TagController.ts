import { Request, Response } from "express";
import { getAllServices, getWorkerByTag } from "../service/TagService";


export const getServices = async (req: Request, res: Response) => {
    const services = await getAllServices()
    if (services) {
        res.status(200).json(services)
    }else{
        res.status(404).json({ message: "No hay servicios" })
    }
}

export const getWorkesByTag = async (req: Request, res: Response) => {
    const idTag = req.params.idTag
    const workers = await getWorkerByTag(Number(idTag))
    if (workers.length > 0) {
        res.status(200).json(workers)
    }else{
        res.status(200).json({ message: 'No hay trabajadores con ese tag' })
    }
}