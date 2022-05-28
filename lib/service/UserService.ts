import { PrismaClient } from '@prisma/client'
import User from '../models/User'
import generateJWT from '../helpers/generate-jwt';

const bcrypt = require('bcryptjs');
const prisma = new PrismaClient()

class UserService{

    static createUser = async(user: User) => {

        const existe = await prisma.usuario.findUnique({
            where: {
                correo: user.correo
            }
        })

        try {
            if(existe){
                return {
                    message: 'El correo ya existe'
                }
            }else{
                const usuario =  await prisma.usuario.create({
                    data: {
                        ...user,
                        contrasena: bcrypt.hashSync(user.contrasena, 9)
                    }
                })

                if(usuario){
                    return usuario
                }else{
                    return {
                        message: 'No se pudo crear el usuario'
                    }
                }

            }   
        } catch (error) {
            return {
                message: 'Error al crear el usuario: ' + error
            }
        }
        
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
                latitud: user?.latitud,
                longitud: user?.longitud,
                idRol: user?.idRol,
                tokenFCM: user?.tokenFCM,
                descripcion: user?.descripcion,
                valoracion: user?.valoracion
            }
        })
    }

    static postTokenFCM = async(id: number, tokenFCM: string) => {
        return prisma.usuario.update({
            where: { id: id },
            data: { tokenFCM }
        }).then(user => {
            return {
                message: 'Se actualizó el tokenFCM'
            }
        })
    }

    static authenticateUser = async (correo: string, contrasena: string, tokenFCM: string) => {
        const user = await prisma.usuario.findUnique({ where: { correo } })
        
        if (!user) return { message: 'Usuario no encontrado' }
        
        if (!bcrypt.compareSync(contrasena, user.contrasena)) {
            return {
                message: 'Algún dato es incorrecto'
            }
        }

        const responseFCM = await prisma.usuario.update({
            where: { id: user.id },
            data: { tokenFCM }
        })

        if(!responseFCM){
            return {
                message: 'No se pudo actualizar el tokenFCM'
            }
        }

        const dataUser = await prisma.usuario.findUnique({ where: { correo } })

        const userForToken = {
            id: dataUser!.id,
            correo: dataUser!.correo,
            nombre: dataUser!.nombre,
            urlFoto: dataUser!.urlFoto,
            numero: dataUser!.numero,
            idRol: dataUser!.idRol,
            tokenFCM: dataUser!.tokenFCM,
        }

        const token = await generateJWT(userForToken)
        return {
            token,
            user: userForToken
        }
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