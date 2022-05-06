import { PrismaClient } from '@prisma/client'
import User from '../models/User'

const bcrypt = require('bcryptjs');
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken');

class UserService{

    static createUser(user: User){
        user.contrasena = bcrypt.hashSync(user.contrasena, 9);
        return prisma.usuario.create({
            data: user
        })
    }    

    static getUserById(id: number){
        return prisma.usuario.findFirst({
            where: { id }
        })
    }

    static authenticateUser(correo: string, contrasena: string){
        return prisma.usuario.findFirst({
            where: { correo }
        }).then(user => {
            if(user){
                if(bcrypt.compareSync(contrasena, user.contrasena)){
                    const userForToken = {
                        id: user.id,
                        correo: user.correo,
                        idRol: user.idRol
                    }
                    const token = jwt.sign(userForToken, process.env.SECRET);
                    return {
                        user,
                        token
                    }
                }else{
                    return null
                }
            }
        }).catch(err => {
            return null
        })
    }

    static putUser(id: number, user: User){
        return prisma.usuario.update({
            where: { id: id },
            data: user
        })
    }

    static getAllUsers(){
        return prisma.usuario.findMany()
    }

    static getUserByRole(idRol: number){
        return prisma.usuario.findMany({
            where: { idRol }
        })
    }

}

export default UserService