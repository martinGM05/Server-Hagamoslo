import { PrismaClient } from '@prisma/client'
import RoleService from '../../lib/service/RoleService';


const prisma = new PrismaClient()


describe('Pruebas para el servicio de roles', () => {

    test('1) Crear roles', async () => {
            
        const roles = await prisma.roles.createMany({
            data: [
                { rol: 'Cliente' },
                { rol: 'Trabajador' },
                { rol: 'Ambas' },
            ]
        })

        expect(roles.count).toBeGreaterThan(0)

    })

    test('Obtener roles', async () => {
        const roles = await RoleService.getRoles()
        expect(roles).toEqual(expect.arrayContaining([
            {"id": 1, "rol": "Cliente"}, 
            {"id": 2, "rol": "Trabajador"}, 
            {"id": 3, "rol": "Ambas"}
        ]))
    })

})