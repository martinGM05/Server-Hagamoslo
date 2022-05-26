import { PrismaClient} from '@prisma/client'
import SearchService from '../../lib/service/SearchService'
const prisma = new PrismaClient()

const coordenasOrigen = {
    lat: 19.860483,
    lng: -97.359418
}

describe('Test for Search service', () => {

    test('Search service around', async () => {
        return await prisma.usuario.findMany({
            where: {
                idRol: {
                    in: [2, 3]
                },
            },
            include: {
                tags: true,
            },
        })
    })

})