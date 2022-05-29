import { Request, Response } from "express";
import { getServiceHired, createServiceHired, updateStatusService } from "../service/Hired";


class HiredController {

    static async getServiceHired(req: Request, res: Response) {
        const { idUser, status } = req.params;
        const statusCast = status === 'true' ? true : false;
        const services = await getServiceHired(Number(idUser), statusCast);
        if (services.length > 0) {
            res.status(200).json(services);
        } else {
            res.status(204).json({
                msg: 'No hay servicios contratados'
            });
        }
    }

    static async createServiceHired(req: Request, res: Response) {
        const { body } = req
        const service = await createServiceHired(body)
        try {
            if (service) {
                res.status(201).json(service)
            } else {
                res.status(400).json({ message: 'Error al contratar el servicio' })
            }
        } catch (error) {
            res.status(500).json({ message: 'Error: ' + error })
        }
    }

    static async updateStatusService(req: Request, res: Response) {
        const { idServiceHired } = req.params;
        const service = await updateStatusService(Number(idServiceHired), false);
        try {
            if (service) {
                res.status(200).json(service)
            } else {
                res.status(400).json({ message: 'Error al actualizar el estado del servicio' })
            }
        } catch (error) {
            res.status(500).json({ message: 'Error: ' + error })
        }
    }
}

export default HiredController;