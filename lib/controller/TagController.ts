import { Request, Response } from "express";
import { getAllServices, getWorkerByTag } from "../service/TagService";


export const getServices = async (req: Request, res: Response) => {
    const services = await getAllServices()
    res.json(services)
}

export const getWorkesByTag = async (req: Request, res: Response) => {
    const idTag = req.params.idTag
    const workers = await getWorkerByTag(Number(idTag))
    if (workers.length > 0) {
        res.json(workers)
    }else{
        res.json({ message: 'No hay trabajadores con ese tag' })
    }
}