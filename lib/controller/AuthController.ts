import { Request, Response } from "express";
import UserService from "../service/UserService";


export const authenticateUser = async (req: Request, res: Response) => {
    const { correo, contrasena } = req.body;
    try {
        const user = await UserService.authenticateUser(correo, contrasena);
        if(user){
            res.status(200).json(user);
        }else{
            res.status(400).json({
                message: 'Error al autenticar usuario'
            });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error al autenticar usuario' });
    }
}