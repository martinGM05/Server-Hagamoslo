import { PrismaClient } from '@prisma/client'
import UserService from './UserService';

const prisma = new PrismaClient()

export interface createWorkerProps {
    idUser: number, 
    description: string, 
    valoracion: number
}

class WorkerService {

    static async getWorkersClients() {
        return prisma.usuario.findMany({
            where: { idRol: { in: [2, 3] } },
            include: {
                tags: {
                    include: {
                        tag: true
                    }
                }
            },
        }).then(users => {
            return users.map(user => {
                return {
                    id: user.id,
                    nombre: user.nombre,
                    correo: user.correo,
                    numero: user.numero,
                    latitud: user.latitud,
                    longitud: user.longitud,
                    descripcion: user.descripcion,
                    tokenFCM: user.tokenFCM,
                    valoracion: user.valoracion,
                    tags: user.tags.map(tag => tag.tag.nombre),
                }
            })
        })
    }

    static async getWorkerById(idUser: number) {
        const worker = await prisma.usuario.findUnique({
            where: { id: idUser },
            include: {
                tags: {
                    include: {
                        tag: true
                    }
                }
            }
        })
        return {
            id: worker!.id,
            nombre: worker!.nombre,
            correo: worker!.correo,
            numero: worker!.numero,
            latitud: worker!.latitud,
            longitud: worker!.longitud,
            descripcion: worker!.descripcion,
            tokenFCM: worker!.tokenFCM,
            valoracion: worker!.valoracion,
            tags: worker!.tags.map(tag => tag.tag.nombre),
        }
    }

    static async changeRole(props: createWorkerProps){
        const { idUser, description, valoracion } = props
    
        const user = await UserService.getUserById(idUser)
        if(user){
            if(user.idRol === 1){
                return prisma.usuario.update({
                    where: { id: idUser },
                    data: {
                        idRol: 3,
                        descripcion: description,
                        valoracion: valoracion
                    }
                })
            }else if(user.idRol === 2){
                return {
                    msg: 'El usuario ya es un trabajador'
                }
            }else if(user.idRol === 3){
                return {
                    msg: 'El usuario ya es un cliente y trabajador'
                }
            }
        }
    }
}

export default WorkerService