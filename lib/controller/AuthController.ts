import { Request, Response } from "express";
import UserService from "../service/UserService";


export const authenticateUser = async (req: Request, res: Response) => {
    const { correo, contrasena } = req.body;
    try {
        await UserService.authenticateUser(correo, contrasena)
            .then(user => {
                res.status(200).json({
                    msg: 'Usuario autenticado',
                });
            })
            .catch(err => {
                res.status(500).json({
                    err,
                    msg: 'Hay pedo'
                });
            })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error al autenticar usuario' });
    }
}