import { PrismaClient } from '@prisma/client'
import User from '../models/User'
import generateJWT from '../helpers/generate-jwt';

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
                    return null
                }
            }
        }).catch(err => {
            return null
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