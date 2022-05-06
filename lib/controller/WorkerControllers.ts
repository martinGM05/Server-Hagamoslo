import { Request, Response } from "express";
import UserService from "../service/UserService";
import WorkerService from '../service/WorkerService';

export const getAllUsersClient = async (req: Request, res: Response) => {
    const users = await WorkerService.getAllWorkersAndClients();
    if(users){
        res.status(200).json(users);
    }else{
        res.status(404).json({
            message: 'Error al obtener usuarios'
        });
    }
}

export const changeRoleWorker = async (req: Request, res: Response) => {
    const { idUser } = req.params;
    const { email, password, description, valoracion } = req.body;

    const user = await UserService.authenticateUser(email, password);
    if(user){
        if(user?.user.idRol === 1){
            const changeRol = await UserService.changeRoleClient(Number(idUser), 3);
            if(changeRol){
                res.status(200).json(changeRol);
            }else{
                res.status(500).json({
                    message: 'Error al cambiar rol'
                });
            }
        }else if(user?.user.idRol === 2){
            res.status(200).json({
                message: 'El usuario ya es un trabajador'
            });
        }else if(user?.user.idRol === 3){
            res.status(200).json({
                message: 'El usuario es un cliente y trabajador'
            });
        }
    }

    // const user = await WorkerService.changeRoleWorker(Number(idUser), idRol, description, valoracion);
    // if(user){
    //     res.status(200).json(user);
    // }else{
    //     res.status(404).json({
    //         message: 'Error al cambiar rol'
    //     });
    // }
}