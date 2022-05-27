import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export interface Tags {
    idTag: number,
}

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
            latidud: worker.latitud,
            longitud: worker.longitud,
            descripcion: worker.descripcion,
            valoracion: worker.valoracion, 
            tags: worker.tags.map(tag => tag.tag.nombre) 
        }
    })
}

const getAllServices = async () => {
    return await prisma.tag.findMany()
}

const assignment = async (idUsuario: number, idsTag: number[]) => {

    try {
        idsTag.forEach(async (idTag) => {
            let assigment = {
                idUsuario,
                idTag,
            }
            await prisma.servicio.create({
                data: assigment
            })
        })
    
        return {
            message: 'Servicio asignado'
        }
    } catch (error) {
        return {
            message: 'Error al asignar el servicio'
        }
    }
}

export {
    getWorkerByTag,
    getAllServices,
    assignment
}
