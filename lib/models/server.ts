import express, { Application } from "express"
import userRoutes from "../routes/users";
import authRoutes from "../routes/auth";
import workerRoutes from "../routes/workers";
import tagRoutes from "../routes/tag";
import cors from 'cors';
import bodyParser from 'body-parser';

class Server {
    
    private app: Application;
    private port: string;
    private apiPaths = {
        auth: '/api/auth',
        users: '/api/usuarios',
        workers: '/api/workers',
        tag: '/api/service'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';
        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.app.use(cors())
        this.app.use(bodyParser.json({limit: '50mb'}))
        this.app.use(express.json())

    }

    routes(){
        this.app.use(this.apiPaths.auth, authRoutes)
        this.app.use(this.apiPaths.users, userRoutes)
        this.app.use(this.apiPaths.workers, workerRoutes)
        this.app.use(this.apiPaths.tag, tagRoutes)
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto ${this.port}`)
        })
    }
}

export default Server;