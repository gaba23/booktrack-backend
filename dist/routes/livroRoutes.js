"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
// Todas as rotas precisam de autenticação
router.use(middlewares_1.authMiddleware);
// Rotas que precisam verificar se o usuário é dono do livro
router.put('/livros/:id', middlewares_1.checkLivroOwner, async (req, res) => {
    // Lógica para atualizar o livro
});
router.delete('/livros/:id', middlewares_1.checkLivroOwner, async (req, res) => {
    // Lógica para deletar o livro
});
// Rotas que não precisam verificar o dono
router.get('/livros', async (req, res) => {
    // Lógica para listar livros
});
router.post('/livros', async (req, res) => {
    // Lógica para criar livro
});
exports.default = router;
