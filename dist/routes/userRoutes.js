"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userService_1 = require("../services/userService");
const router = (0, express_1.Router)();
// Rota para adicionar um usuário
router.post('/users', async (req, res) => {
    const { name, email } = req.body;
    const user = await (0, userService_1.addUser)(name, email);
    res.status(201).json(user);
});
// Rota para listar usuários
router.get('/users', async (req, res) => {
    const users = await (0, userService_1.getUsers)();
    res.status(200).json(users);
});
exports.default = router;
