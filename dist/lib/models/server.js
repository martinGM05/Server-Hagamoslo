"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("../routes/users"));
const auth_1 = __importDefault(require("../routes/auth"));
const workers_1 = __importDefault(require("../routes/workers"));
const tag_1 = __importDefault(require("../routes/tag"));
const hired_1 = __importDefault(require("../routes/hired"));
const uploads_1 = __importDefault(require("../routes/uploads"));
const cors_1 = __importDefault(require("cors"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
class Server {
    constructor() {
        this.apiPaths = {
            auth: '/api/auth',
            users: '/api/usuarios',
            workers: '/api/workers',
            tag: '/api/service',
            hired: '/api/hired',
            upload: '/api/upload',
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8000';
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.static('public'));
        this.app.use((0, express_fileupload_1.default)({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true,
        }));
    }
    routes() {
        this.app.use(this.apiPaths.auth, auth_1.default);
        this.app.use(this.apiPaths.users, users_1.default);
        this.app.use(this.apiPaths.workers, workers_1.default);
        this.app.use(this.apiPaths.tag, tag_1.default);
        this.app.use(this.apiPaths.hired, hired_1.default);
        this.app.use(this.apiPaths.upload, uploads_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto ${this.port}`);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map