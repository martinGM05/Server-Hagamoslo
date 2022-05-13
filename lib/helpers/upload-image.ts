const path = require("path");
const { v4: uuidv4 } = require('uuid')

const uploadImageServer = (file: any, carpeta: string = '') => {
    return new Promise((resolve, reject) => {
        const { archivo } = file;
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1];
    
        const extensionesValidas = ['png', 'jpg', 'jpeg'];
        if (!extensionesValidas.includes(extension)) {
            return reject(`Extension ${extension} no es válida. ${extensionesValidas.join(', ')} son las extensiones válidas`)
        }
        const nombreTemp = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '../images/', carpeta , nombreTemp);
        archivo.mv(uploadPath, (err: Error) => {
            if (err) {
                return reject(err);
            }
            resolve(nombreTemp);
        });
    })
}

module.exports = {
    uploadImageServer
}