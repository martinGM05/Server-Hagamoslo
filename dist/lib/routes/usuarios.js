"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UsuariosController_1 = require("../controller/UsuariosController");
const router = (0, express_1.Router)();
router.get('/', UsuariosController_1.getUsuarios);
router.get('/:id', UsuariosController_1.getUsuario);
router.post('/', UsuariosController_1.postUsuario);
router.put('/:id', UsuariosController_1.putUsuario);
exports.default = router;
//# sourceMappingURL=usuarios.js.map