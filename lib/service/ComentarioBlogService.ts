import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface ComentarioBlog{
    comentario: string
    idBlog: number
    idTrabajador: number
}

class ComentarioBlogService{

    static getComentariosBlog = async (id: number) => {
        const comentarios = prisma.comentarioBlog.findMany({
            where: { idBlog: id }
        })

        const comentariosWithUser = await Promise.all((await comentarios).map(async comentario => {
            const user = await prisma.usuario.findFirst({
                where: { id: comentario.idTrabajador }
            })
            return {
                ...comentario,
                user: {
                    id: user?.id,
                    nombre: user?.nombre,
                    correo: user?.correo,
                }
            }
        }))

        return comentariosWithUser

    }

    static createComentarioBlog = async (comentarioBlog: ComentarioBlog) => {
        return prisma.comentarioBlog.create({
            data: comentarioBlog
        })
    }

}

export default ComentarioBlogService