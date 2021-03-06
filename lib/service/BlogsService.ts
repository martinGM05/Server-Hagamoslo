import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface Blog{
    titulo: string;
    descripcion: string;
    idUsuario: number;
}

class BlogsService{

    static getAllBlogs = async () => {
        const blogs = await prisma.blog.findMany()

        const blogsWithUser = await Promise.all((await blogs).map(async blog => {
            const user = await prisma.usuario.findFirst({
                where: { id: blog.idUsuario }
            })
            return {
                ...blog,
                user: {
                    id: user?.id,
                    nombre: user?.nombre,
                    correo: user?.correo,
                    tokenFCM: user?.tokenFCM
                }
            }
        }))

        return blogsWithUser
    }

    static getBlogById = async (id: number) => {
        return prisma.blog.findMany({
            where: { idUsuario: id }
        })
    }

    static createBlog = async (blog: Blog) => {
        return prisma.blog.create({
            data: blog
        })
    }

    static deleteBlog = async (id: number) => {

        const response = await prisma.comentarioBlog.deleteMany({
            where: { idBlog: id }
        })

        if(response){
            await prisma.blog.delete({
                where: { id }
            })
            return {
                msg: 'Blog eliminado'
            }
        }
    }

}

export default BlogsService