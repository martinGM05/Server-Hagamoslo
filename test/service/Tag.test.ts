import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


describe('Test for Tag service', () => {

    test('0) Create tags', async () => {
            
        const tags = await prisma.tag.createMany({
            data: [
                { nombre: 'Carpintero', icono: 'hammer-outline'},
                { nombre: 'Electricista', icono: 'flash-outline'},
                { nombre: 'Mecanico', icono: 'analytics-outline'},
                { nombre: 'Pintor', icono: 'star-outline'},
            ]
        })    
        
        expect(tags.count).toBeGreaterThan(0)

    })

    test('1) Add Tags to Worker', async () => {
        const assigments = [
            { idUsuario: 3, idTag: 1 },
            { idUsuario: 3, idTag: 2 },
            { idUsuario: 4, idTag: 2 },
            { idUsuario: 4, idTag: 3 },
            { idUsuario: 3, idTag: 4 },
        ]

        await prisma.servicio.createMany({
            data: assigments,
        })

        const allAssigments = await prisma.servicio.findMany();
        // console.log(allAssigments)
        expect(allAssigments).not.toEqual([])
    })

    test('2) Get Services', async () => {
        const allUsers = await prisma.usuario.findMany({
            include: { tags: { include: { tag: true  } } }
        })

        const restul = allUsers.map(user => {
            return { ...user, tags: user.tags.map(tag => tag.tag.nombre) }
        })

        console.log(JSON.stringify(restul))
        expect(restul).not.toEqual([])
    })

    test('3) Get all services', async () => {
        const allServices = await prisma.tag.findMany()
        console.log(JSON.stringify(allServices))
        expect(allServices).not.toEqual([])
    })

    test('4) Get worker by tag', async () => {

        const idTag = 2

        const workersByTag = await prisma.usuario.findMany({            
            where: { idRol: { in: [2, 3] }, tags: { some: { idTag } } }, 
            include: { tags: { include: { tag: true } } },
        })

        const result = workersByTag.map(worker => {
            return { 
                id: worker.id,
                nombre: worker.nombre,
                urlFoto: worker.urlFoto,
                latitud: worker.latitud,
                longitud: worker.longitud,
                descripcion: worker.descripcion,
                valoracion: worker.valoracion, 
                tags: worker.tags.map(tag => tag.tag.nombre) 
            }
        })

        console.log(JSON.stringify(result))
        expect(result).not.toEqual([])
    })

})