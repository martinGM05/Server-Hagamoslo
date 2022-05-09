import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


const getServiceHired = async (idUser: number, estado: boolean) => {

    const serviciosContradados = await prisma.servicioContratado.findMany({
        where: { idUsuario: idUser, estado: estado },
        include: { Trabajador: true },
    });

    return serviciosContradados.map(serviciosContradados => {
        return {
            descripcion: serviciosContradados.descripcion,
            fechaInicio: serviciosContradados.fechaInicio,
            fechaFin: serviciosContradados.fechaFin,
            costo: serviciosContradados.costo,
            trabajador: {
                nombre: serviciosContradados.Trabajador.nombre,
                urlFoto: serviciosContradados.Trabajador.urlFoto,
            }
        }
    })
}

export {
    getServiceHired,
}
