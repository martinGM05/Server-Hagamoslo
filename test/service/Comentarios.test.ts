import { getComentarysByUser } from '../../lib/service/ComentariosService'

describe("Test for Comentarios", () => {
    // test("1) Add comentario", async () => {
    //     const comentario = {
    //         idCliente: 6,
    //         Comentario: "Comentario de prueba 2",
    //         Imagen: "",
    //         Fecha: "2022-01-01",
    //     }
    //     const result = await prisma.comentario.create({
    //         data: {comentario}            
    //     })

    //     const result2 = await prisma.comentarioUsuario.create({
    //         data: {
    //             idUsuario: 8,
    //             idComentario: result.id
    //         }
    //     })

    //     console.log(result2)

    //     expect(result2).not.toEqual([])


    // })


    test("2) Get comentarios", async () => {
        
        const idUser = 8
        const comentarios = await getComentarysByUser(idUser)
        console.log(comentarios)
        expect(comentarios).not.toEqual([])

    })
})