"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const data_source_1 = require("../database/data-source");
const User_1 = require("../entities/User");
const router = (0, express_1.Router)();
// Rota para listar usuários
router.get('/listar', async (req, res) => {
    try {
        const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
        const users = await userRepository.find();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Rota para deletar usuário
router.delete('/deletar/:id', async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
        const user = await userRepository.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        await userRepository.remove(user);
        res.status(200).json({ message: 'Usuário deletado com sucesso' });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.default = router;
