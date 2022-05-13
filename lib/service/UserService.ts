import { PrismaClient } from '@prisma/client'
import User from '../models/User'
import generateJWT from '../helpers/generate-jwt';

const bcrypt = require('bcryptjs');
const prisma = new PrismaClient()

class UserService{

    static createUser = async(user: User) => {
        return prisma.usuario.create({
            data: {
                ...user,
                contrasena: bcrypt.hashSync(user.contrasena, 9)
            }
        })
    }    

    static getAllUsers(){
        return prisma.usuario.findMany()
    }

    static getUserById(id: number){
        return prisma.usuario.findFirst({
            where: { id }
        }).then(user => {
            return {
                id: user?.id,
                nombre: user?.nombre,
                correo: user?.correo,
                urlFoto: user?.urlFoto,
                numero: user?.numero,
                localizacion: user?.localizacion,
                idRol: user?.idRol,
                descripcion: user?.descripcion,
                valoracion: user?.valoracion
            }
        })
    }

    static authenticateUser(correo: string, contrasena: string){
        return prisma.usuario.findFirst({
            where: { correo }
        }).then(async user => {
            if(user){
                if(bcrypt.compareSync(contrasena, user.contrasena)){
                    const userForToken = {
                        id: user.id,
                        correo: user.correo,
                        nombre: user.nombre,
                        urlFoto: user.urlFoto,
                        numero: user.numero,
                        idRol: user.idRol,
                    }
                    const token = await generateJWT(userForToken);

                    return {
                        user,
                        token
                    }
                }else{
                    return {
                        message: 'Contraseña incorrecta'
                    }
                }
            }
        }).catch(err => {
            return {
                message: 'Usuario no encontrado'
            }
        })
    }

    static changeRoleClient(idUser: number, idRol:number){

        return prisma.usuario.update({
            where: { id: idUser },
            data: { idRol }
        }).then(user => {
            return {
                message: 'Se cambió el rol del usuario'
            }
        })

    }

    static putUser(id: number, user: User){
        return prisma.usuario.update({
            where: { id: id },
            data: user
        })
    }

    static getUserByRole(idRol: number){
        return prisma.usuario.findMany({
            where: { idRol }
        })
    }

}

export default UserService