import { Request, Response } from "express";
import UserService from "../service/UserService";


export const authenticateUser = async (req: Request, res: Response) => {
    const { correo, contrasena, tokenFCM } = req.body;
    try {

        if(!correo || !contrasena) {
            return res.status(400).json({
                message: "No se han enviado los datos necesarios"
            });
        }
        const auth = await UserService.authenticateUser(correo, contrasena, tokenFCM);
        res.status(200).json(auth);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error al autenticar usuario' });
    }
}