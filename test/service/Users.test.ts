import { PrismaClient} from '@prisma/client'
import User from '../../lib/models/User'
import UserService from '../../lib/service/UserService'
const prisma = new PrismaClient()


describe('Test for User service', () => {

    // test('Create User', () => {
    //     const user: User = {
    //         nombre: 'Manuel',
    //         correo: 'manuel.gm05@gmail.com',
    //         contrasena: '123456',
    //         urlFoto: '',
    //         localizacion: 'Lat: -34.6083, Long: -58.3712',
    //         numero: '2311434214',
    //         idRol: 1
    //     }
    //     return UserService.createUser(user)
    // })


    test('Get users', async () => {
        const user = await UserService.getUserById(6)
        // console.log(user)
        expect(user).not.toBeNull()
    })

    test('Get users by role', async () => {
        const users = await UserService.getUserByRole(2)
        // console.log(users)
        expect(users).not.toEqual([])
    })

    test('Authenticate user', async () => {
        const user = await UserService.authenticateUser('manuel.gm05@gmail.com', '123456')
        // console.log(user)
        expect(user).not.toBeNull()
    })

})