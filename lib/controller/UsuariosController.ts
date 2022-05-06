import { Request, Response } from "express";
import UserService from "../service/UserService";

export const getUsuarios = async (req: Request, res: Response) => {
    const users = await UserService.getAllUsers();
    res.status(200).json(users);
}

export const getUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await UserService.getUserById(Number(id));
    if(user){
        res.status(200).json(user);
    }else{
        res.status(404).json({
            message: 'Usuario no encontrado'
        });
    }
}

export const postUsuario = async (req: Request, res: Response) => {
    
    const { body } = req;

    await UserService.createUser(body)
        .then(user => {
            res.status(201).json(user);
        }).catch(err => {
            res.status(500).json(err);
        });
}

export const putUsuario = async(req: Request, res: Response) => {
    
    const { id } = req.params;
    const { body } = req;

    await UserService.putUser(Number(id), body)
        .then(user => {
            res.status(200).json(user);
        }).catch(err => {
            res.status(500).json(err);
        })
}