import { Request, Response } from "express";
import UserService from "../service/UserService";

export const getUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;
    // const idLogged = req.body.correo // Regresa el id del usuario logueado  
   
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

export const changeRoleClient = async (req: Request, res: Response) => {
    const { idUser } = req.params;
    const { email, password } = req.body;

    const user = await UserService.authenticateUser(email, password);
    if(user){
        if(user?.user.idRol === 2){
            const changeRol = await UserService.changeRoleClient(Number(idUser), 3);
            if(changeRol){
                res.status(200).json(changeRol);
            }else{
                res.status(500).json({
                    message: 'Error al cambiar rol'
                });
            }
        }else if(user?.user.idRol === 1){
            res.status(200).json({
                message: 'El usuario ya es un cliente'
            });
        }else if(user?.user.idRol === 3){
            res.status(200).json({
                message: 'El usuario es un cliente y trabajador'
            })
        }
    }
    
}