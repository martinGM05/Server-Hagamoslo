interface User{
    id?: number
    nombre: string
    correo: string
    contrasena: string
    urlFoto: string
    numero: string
    localizacion: string
    idRol: number
    descripcion?: string
    valoracion?: number 
}

export default User