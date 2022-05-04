import express, { Application } from "express"
import userRoutes from "../routes/usuarios";
import cors from 'cors';

class Server {
    
    private app: Application;
    private port: string;
    private apiPaths = {
        usuarios: '/api/usuarios'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';
        this.routes();
    }

    middlewares(){
        this.app.use(cors())
    }

    routes(){
        this.app.use(this.apiPaths.usuarios, userRoutes)
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto ${this.port}`)
        })
    }
}

export default Server;