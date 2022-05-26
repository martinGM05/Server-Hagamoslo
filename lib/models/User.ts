interface User{
    id?: number
    nombre: string
    correo: string
    contrasena: string
    urlFoto: string
    numero: string
    latitud: string
    longitud: string
    idRol: number
    descripcion?: string
    valoracion?: number 
}

export default User