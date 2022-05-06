"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putUsuario = exports.postUsuario = exports.authenticateUser = exports.getUsuario = exports.getUsuarios = void 0;
const UserService_1 = __importDefault(require("../service/UserService"));
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield UserService_1.default.getAllUsers();
    res.status(200).json(users);
});
exports.getUsuarios = getUsuarios;
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield UserService_1.default.getUserById(Number(id));
    if (user) {
        res.status(200).json(user);
    }
    else {
        res.status(404).json({
            message: 'Usuario no encontrado'
        });
    }
});
exports.getUsuario = getUsuario;
const authenticateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { correo, contrasena } = req.body;
    yield UserService_1.default.authenticateUser(correo, contrasena)
        .then(user => {
        if (user) {
            res.status(200).json(user);
        }
        else {
            res.status(404).json({
                message: 'Usuario no encontrado'
            });
        }
    }).catch(err => {
        res.status(500).json({
            message: 'Error al autenticar usuario'
        });
    });
});
exports.authenticateUser = authenticateUser;
const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    yield UserService_1.default.createUser(body)
        .then(user => {
        res.status(201).json(user);
    }).catch(err => {
        res.status(500).json(err);
    });
});
exports.postUsuario = postUsuario;
const putUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    yield UserService_1.default.putUser(Number(id), body)
        .then(user => {
        res.status(200).json(user);
    }).catch(err => {
        res.status(500).json(err);
    });
});
exports.putUsuario = putUsuario;
//# sourceMappingURL=usuarios.js.map