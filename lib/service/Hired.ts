import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

interface ServicioContratado {
    idUsuario: number
    idTrabajador: number
    descripcion: string
    fechaInicio?: string
    fechaFin?: string
    estado: boolean
    costo: number
}

const getServiceHired = async (idUser: number, estado: boolean) => {

    const serviciosContradados = await prisma.servicioContratado.findMany({
        where: { idUsuario: idUser, estado: estado },
        include: { Trabajador: true },
    });

    return serviciosContradados.map(serviciosContradados => {
        return {
            id: serviciosContradados.id,
            descripcion: serviciosContradados.descripcion,
            fechaInicio: serviciosContradados.fechaInicio,
            fechaFin: serviciosContradados.fechaFin,
            costo: serviciosContradados.costo,
            trabajador: {
                idTrabajador: serviciosContradados.Trabajador.id, 
                nombre: serviciosContradados.Trabajador.nombre,
                tokenFCM: serviciosContradados.Trabajador.tokenFCM,
            }
        }
    })
}


const getServiceWorkerHired = async (idTrabajador: number, estado: boolean) => {
    const serviciosContradados = await prisma.servicioContratado.findMany({
        where: { idTrabajador: idTrabajador, estado: estado },
        include: { Trabajador: true },
    });

    return serviciosContradados.map(serviciosContradados => {
        return {
            id: serviciosContradados.id,
            descripcion: serviciosContradados.descripcion,
            fechaInicio: serviciosContradados.fechaInicio,
            fechaFin: serviciosContradados.fechaFin,
            costo: serviciosContradados.costo,
            usuario: {
                idUsuario: serviciosContradados.Trabajador.id, 
                nombre: serviciosContradados.Trabajador.nombre,
                tokenFCM: serviciosContradados.Trabajador.tokenFCM,
            }
        }
    })

}

const updateStatusService = async (idServicio: number, estado: boolean) => {
    const result = await prisma.servicioContratado.update({
        where: { id: idServicio },
        data: { estado }
    })

    try {
        if(result) {
            return {
                msg: 'Estado del servicio actualizado'
            }
        }else{
            return {
                msg: 'Error al actualizar el estado del servicio'
            }
        }
    } catch (error) {
        return {
            msg: 'Error: ' + error
        }
    }
}

const createServiceHired = async (servicioContratado: ServicioContratado) => {
    const result = await prisma.servicioContratado.create({
        data: servicioContratado
    })

    try {
        if(result) {
            return {
                msg: 'Servicio contratado'
            }
        }else{
            return {
                msg: 'Error al contratar el servicio'
            }
        }
    } catch (error) {
        return {
            msg: 'Error: ' + error
        }
    }

}


export {
    getServiceHired,
    createServiceHired,
    updateStatusService,
    getServiceWorkerHired
}
