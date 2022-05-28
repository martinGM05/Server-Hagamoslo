import { PrismaClient } from '@prisma/client'
import UserService from './UserService';

const prisma = new PrismaClient()

export interface createWorkerProps {
    idUser: number, 
    description: string, 
    valoracion: number, 
    email: string, 
    password: string
}


const changeRoleWorker = async (props: createWorkerProps) => {

    const { idUser, email, password, description, valoracion } = props
    
    const user = await UserService.authenticateUser(email, password, '');
    // if (user) {
    //     if(user?.user.idRol === 1){
    //         const changeRol = await prisma.usuario.update({
    //             where: { id: idUser },
    //             data: { idRol: 3, descripcion: description, valoracion }
    //         })
    //         if (changeRol) {
    //             return {
    //                 message: 'Se cambió el rol del usuario'
    //             }
    //         }else{
    //             return 'Error al cambiar rol'
    //         }
    //     }else if(user?.user.idRol === 2){
    //         return 'El usuario ya es un trabajador'
    //     }else if(user?.user.idRol === 3){
    //         return 'El usuario es un cliente y trabajador'
    //     }
    // }
}

const getAllWorkersAndClients = () => {

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
                valoracion: user.valoracion,
                tags: user.tags.map(tag => tag.tag.nombre)
            }
        })
    })
}

const postJoinTagWithWorker = async (idUser: number, idTag: number) => {
    
}

export {
    changeRoleWorker,
    getAllWorkersAndClients
}
