"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UsuariosController_1 = require("../controller/UsuariosController");
const ValidateJWT_1 = __importDefault(require("../middlewares/ValidateJWT"));
const router = (0, express_1.Router)();
// router.get('/', getUsuarios);
router.get('/:id', [
    ValidateJWT_1.default,
], UsuariosController_1.getUsuario);
router.post('/', [
    ValidateJWT_1.default,
], UsuariosController_1.postUsuario);
router.put('/:id', [
    ValidateJWT_1.default,
], UsuariosController_1.putUsuario);
exports.default = router;
//# sourceMappingURL=usuarios.js.map