const jwt = require('jsonwebtoken');

export interface UserToken{
    id: number;
    correo: string;
    nombre: string;
    urlFoto: string;
    numero: string;
    idRol: number;
    tokenFCM: string;
}

const generateJWT = (User: UserToken) => {
    return new Promise((resolve, reject) => {

        const payload = User

        jwt.sign(payload, process.env.SECRET, {
            expiresIn: '4h',
        }, (err: string, token: string) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el token');
            }else{
                resolve(token);
            }
        })
    })
}

export default generateJWT;