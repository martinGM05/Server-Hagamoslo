import { Request, Response } from 'express';

const jwt = require('jsonwebtoken');


const validateJWT = (req: Request, res: Response, next: VoidFunction) => {

    const token = req.header('Api-Key');

    if(!token){
        return res.status(401).json({
            message: 'Token no encontrado'
        });
    }

    try {
        const { id, correo, nombre, urlFoto, numero, idRol  } = jwt.verify(token, process.env.SECRET);

        req.body = {
            id,
            correo,
            nombre,
            urlFoto,
            numero,
            idRol
        }

        next()
    } catch (error) {
        console.log(token)
        res.status(401).json({
            message: 'Token no válido'
        });
    }



}

export default validateJWT;