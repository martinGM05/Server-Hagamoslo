import { Request, Response } from "express";
import WorkerService, { createWorkerProps } from "../service/WorkerService";

class WorkerController {

    static async getWorkersClients(req: Request, res: Response) {
        const workers = await WorkerService.getWorkersClients();
        try {
            if (workers.length > 0) {
                res.status(200).json(workers);
            } else {
                res.status(204).json({
                    msg: 'No hay trabajadores'
                });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error: ' + error })
        }
    }

    static async getWokerUser(req: Request, res: Response) {
        const { idUser } = req.params;
        const worker = await WorkerService.getWorkerById(Number(idUser));
        try {
            if (worker) {
                res.status(200).json(worker);
            } else {
                res.status(204).json({
                    msg: 'No existe el trabajador con el id: ' + idUser
                });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error: ' + error })
        }
    }

    static async changeRoleWorker(req: Request, res: Response) {
        const { idUser } = req.params;
        const { description, valoracion } = req.body;

        const propsWorker: createWorkerProps = {
            idUser: Number(idUser),
            description,
            valoracion
        }

        const worker = await WorkerService.changeRole(propsWorker);
        try {
            if (worker) {
                res.status(200).json(worker);
            } else {
                res.status(400).json({
                    msg: 'No se pudo cambiar el rol del trabajador'
                });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error: ' + error })
        }
    }

}

export default WorkerController;