import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


const getComentarysByUser = async (idUsuario: number) => {

    const comentarios = await prisma.comentarioUsuario.findMany({
        where: { idUsuario },
        include: { Comentario: true },
    })

    return comentarios.map(comentario => {
        return comentario.Comentario.comentario
    })
}

export {
    getComentarysByUser,
}
