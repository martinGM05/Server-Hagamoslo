import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('Test for En Curso', () => {
    test('1) Return a list for services in course', async () => {

        const idUser = 7

        const serviciosContradados = await prisma.servicioContratado.findMany({
            where: { idUsuario: idUser, estado: true },
            include: { Trabajador: true },
        });

        const result = serviciosContradados.map(serviciosContradados => {
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

        console.log(JSON.stringify(result))

        expect(serviciosContradados.length).toBeGreaterThan(0)



    });
})