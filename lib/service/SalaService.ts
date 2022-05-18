import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

class SalaService {

    static async createSala(idSala: string, idUsuario: number, idTrabajador: number) {
        await prisma.sala.createMany({
            data: [
                { idSala, idUsuario,},
                { idSala, idUsuario: idTrabajador }
            ]
        })

        return {
            msg: 'Sala creada'
        }
    }

    static async getSalasByIdUser(idUsuario: number) {
        return prisma.sala.findMany({
            where: { idUsuario }
        })
    }

    static async deleteSala(idSala: string) {
    
        const idSal = await prisma.sala.findMany({
            where: { idSala }
        })

        if (idSal) {
            await prisma.sala.deleteMany({
                where: { idSala }
            })
            return {
                msg: 'Sala eliminada'
            }
        }else{
            return {
                msg: 'No se pudo eliminar la sala'
            }
        }


    }

}

export default SalaService;