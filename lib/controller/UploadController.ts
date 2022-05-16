import { Request, Response } from "express";
import UserService from "../service/UserService";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const { uploadImageServer } = require('../helpers/upload-image')
const path = require('path')
const fs = require('fs')

export const uploadImage = async (req: any, res: Response) => {
    try {
        const nombre = await uploadImageServer(req.files, 'users')
        res.status(200).json({nombre})
    } catch (msg) {
        res.status(400).json({msg})
    }
}

export const updateImage = async (req: any, res: Response) => {
    const { id, carpeta } = req.params;
    
    switch (carpeta) {
        case 'Users':
            let modelo = await prisma.usuario.findUnique({ where: { id: Number(id) } })
            if(!modelo) {
                return res.status(400).json({
                    message: `No se encontro el usuario con id ${id}`
                });
            }

            // Clear image previous
            if(modelo.urlFoto){
                const pathImage = path.join(__dirname, '../images', carpeta, modelo.urlFoto);
                if(fs.existsSync(pathImage)){
                    fs.unlinkSync(pathImage);
                }
            }
            
            const name = await uploadImageServer(req.files, carpeta)
            modelo.urlFoto = name
            await prisma.usuario.update({ where: { id: Number(id) }, data: modelo })
            
            res.status(200).json(modelo);
            break;
    
        default:
            return res.status(400).json({
                message: `No se encontro el usuario con id ${id}`
            })
    };

}