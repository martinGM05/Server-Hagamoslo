import { Request, Response } from "express";
import { changeRoleWorker, createWorkerProps, getAllWorkersAndClients } from '../service/WorkerService';

export const getAllUsersClient = async (req: Request, res: Response) => {
    const users = await getAllWorkersAndClients();
    if(users){
        res.status(200).json(users);
    }else{
        res.status(404).json({
            message: 'Error al obtener usuarios'
        });
    }
}

export const putRoleWorker = async (req: Request, res: Response) => {
    const { idUser } = req.params;
    const { email, password, description, valoracion } = req.body;

    const propsWorker: createWorkerProps = {
        idUser: Number(idUser),
        email,
        password,
        description,
        valoracion
    }

    const user = await changeRoleWorker(propsWorker);
    // if(user){
    //     res.status(200).json(user);
    // }else{
    //     res.status(404).json({
    //         message: 'Error al cambiar rol'
    //     });
    // }

}