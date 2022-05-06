import User from "../models/User";

class OutDataUser {

    private _id: number;
    private _nombre: string; 
    private _correo: string;
    private _urlFoto: string;
    private _numero: string;
    private _localizacion: string;
    private _idRol: number;
    private _descripcion?: string;
    private _valoracion?: number;

    constructor(
        id: number, 
        nombre: string, 
        correo: string,
        urlFoto: string,
        numero: string,
        localizacion: string,
        idRol: number,
        descripcion?: string,
        valoracion?: number
        ) { 
            this._id = id;
            this._nombre = nombre; 
            this._correo = correo;
            this._urlFoto = urlFoto;
            this._numero = numero;
            this._localizacion = localizacion;
            this._idRol = idRol;
            this._descripcion = descripcion;
            this._valoracion = valoracion;
    }

    set allData(data: User){
        this._id = data.id!;
        this._nombre = data.nombre;
        this._correo = data.correo;
        this._urlFoto = data.urlFoto;
        this._numero = data.numero;
        this._localizacion = data.localizacion;
        this._idRol = data.idRol;
        this._descripcion = data.descripcion;
        this._valoracion = data.valoracion;
    }

    toJSON() {
        return {
            id: this._id,
            nombre: this._nombre,
            correo: this._correo,
            urlFoto: this._urlFoto,
            numero: this._numero,
            localizacion: this._localizacion,
            idRol: this._idRol,
            descripcion: this._descripcion,
            valoracion: this._valoracion
        }
    }

}

export default OutDataUser;