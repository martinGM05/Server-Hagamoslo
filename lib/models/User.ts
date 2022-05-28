interface User{
    id?: number
    nombre: string
    correo: string
    contrasena: string
    urlFoto: string
    numero: string
    latitud: number
    longitud: number
    idRol: number
    tokenFCM: string
    descripcion?: string
    valoracion?: number 
}

export default User