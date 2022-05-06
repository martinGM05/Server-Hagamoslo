import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

class WorkerService{

    static changeRoleWorker(idUser: number, idRol: number, description: string, valoracion: number){
        return prisma.usuario.update({
            where: { id: idUser },
            data: {
                idRol,
                descripcion: description,
                valoracion
            }
        }).then(user => {
            return {
                message: 'Se cambió el rol del usuario'
            }
        }).catch(err => {
            return 'No se pudo cambiar el rol del usuario: ' + err
        })
    }

    static getAllWorkersAndClients(){
        return prisma.usuario.findMany({
            where: {
                idRol: { in: [2, 3] }
            }
        }).then(users => {
            return users.map(user => {
                return {
                    id: user.id,
                    nombre: user.nombre,
                    correo: user.correo,
                    urlFoto: user.urlFoto,
                    numero: user.numero,
                    localizacion: user.localizacion,
                    idRol: user.idRol,
                    descripcion: user.descripcion,
                    valoracion: user.valoracion
                }
        })})
    }
}

export default WorkerService;