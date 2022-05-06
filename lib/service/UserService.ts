import { PrismaClient } from '@prisma/client'
import User from '../models/User'

const bcrypt = require('bcryptjs');
const prisma = new PrismaClient()

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
                    return user
                }else{
                    return null
                }
            }
        }).catch(err => {
            return null
        })
    }

    static putUser(user: User){
        return prisma.usuario.update({
            where: { id: user.id },
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