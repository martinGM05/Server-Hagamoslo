import { Request, Response } from "express";
import UserService from "../service/UserService";
const jwt = require('jsonwebtoken');


export const authenticateUser = async (req: Request, res: Response) => {
    const { correo, contrasena } = req.body;
    
    const user = await UserService.authenticateUser(correo, contrasena);
    if(user){
        res.status(200).json(user);
    }else{
        res.status(404).json({
            message: 'Error al autenticar usuario'
        });
    }
}