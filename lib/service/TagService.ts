import { PrismaClient } from '@prisma/client'
import UserService from './UserService'

const prisma = new PrismaClient()

const getWorkerByTag = async (idTag: number) => {

    const workersByTag = await prisma.usuario.findMany({            
        where: { idRol: { in: [2, 3] }, tags: { some: { idTag } } }, 
        include: { tags: { include: { tag: true } } },
    })

    return workersByTag.map(worker => {
        return { 
            id: worker.id,
            nombre: worker.nombre,
            urlFoto: worker.urlFoto,
            localizacion: worker.localizacion,
            descripcion: worker.descripcion,
            valoracion: worker.valoracion, 
            tags: worker.tags.map(tag => tag.tag.nombre) 
        }
    })
}

const getAllServices = async () => {
    return await prisma.tag.findMany()
}

export {
    getWorkerByTag,
    getAllServices
}
