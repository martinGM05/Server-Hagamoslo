import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

interface Sala {
    id: number;
    idSala: string;
    idTrabajador: number;
    nombreTrabajador: string;
}

// interface SalaResponse {
//     sala: Sala[];
// }


let response: Sala[] = []
class SalaService {

    static async createSala(idSala: string, idUsuario: number, idTrabajador: number) {
        await prisma.sala.createMany({
            data: [
                { idSala, idUsuario, idReceptor: idTrabajador },
                { idSala, idUsuario: idTrabajador, idReceptor: idUsuario }
            ]
        })

        return {
            msg: 'Sala creada'
        }
    }

    static async getSalasByIdUser(idUsuario: number) {

        return await prisma.sala.findMany({
            where: { idUsuario },
            select: {
                idSala: true,
                idUsuario: true,
                Receptor: {
                    select: {
                        id: true,
                        nombre: true,
                        descripcion: true,
                        numero: true,
                    }
                }
            }
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