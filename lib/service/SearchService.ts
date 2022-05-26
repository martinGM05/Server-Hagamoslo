import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const coordenasOrigen = {
    lat: 19.860483,
    lng: -97.359418
}

class SearchService {

    static searchServiceAround = async (lat: number, lng: number, radio: number) => {
        const users = await prisma.usuario.findMany({
            where: {
                idRol: {
                    in: [2, 3]
                }
            }
        })

        console.log(users)

    }


}

export default SearchService