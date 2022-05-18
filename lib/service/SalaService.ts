import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

class SalaService {

    static async createSala(idSala: string, idUsuario: number) {
        return prisma.sala.create({
            data: { idSala, idUsuario }
        })
    }

    static async getSalasByIdUser(idUsuario: number) {
        return prisma.sala.findMany({
            where: { idUsuario }
        })
    }

    static async deleteSala(idSala: string) {
    
        const idSal = await prisma.sala.findFirst({
            where: { idSala }
        })

        let id = idSal?.id

        return prisma.sala.delete({
            where: { id }
        })

    }

}

export default SalaService;