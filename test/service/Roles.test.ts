import { PrismaClient } from '@prisma/client'
import RoleService from '../../lib/service/RoleService';
const supertest = require('supertest');

const prisma = new PrismaClient()


describe('Pruebas para el servicio de roles', () => {

    test('Obtener roles', async () => {
        const roles = await RoleService.getRoles()
        expect(roles).toEqual(expect.arrayContaining([
            {"id": 1, "rol": "Cliente"}, 
            {"id": 2, "rol": "Trabajador"}, 
            {"id": 3, "rol": "Ambas"}
        ]))
    })

})