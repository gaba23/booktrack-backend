"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const livroRepository_1 = require("../repositories/livroRepository");
const Livro_1 = require("../entities/Livro");
const class_validator_1 = require("class-validator");
const LivroStatus_1 = require("../types/LivroStatus");
const router = express_1.default.Router();
router.get('/meus-livros', async (req, res) => {
    try {
        if (!req.user?.id) {
            return res.status(401).json({ message: 'Usuário não autenticado' });
        }
        const userId = req.user.id;
        const livros = await livroRepository_1.LivroRepository.findByUser(userId);
        res.json(livros);
    }
    catch (error) {
        res.status(500).json({ message: `Erro ao buscar livros: ${error.message}` });
    }
});
router.post('/adicionar', async (req, res) => {
    try {
        const userId = req.user.id;
        const livroData = new Livro_1.Livro();
        Object.assign(livroData, req.body);
        livroData.id_leitor = userId;
        const errors = await (0, class_validator_1.validate)(livroData);
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }
        const livro = await livroRepository_1.LivroRepository.save(livroData);
        res.status(201).json(livro);
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao adicionar livro' });
    }
});
router.put('/editar/:id', async (req, res) => {
    try {
        const userId = req.user.id;
        const livroId = parseInt(req.params.id);
        const livroExistente = await livroRepository_1.LivroRepository.findOne({ where: { id: livroId, id_leitor: userId } });
        if (!livroExistente) {
            return res.status(404).json({ message: 'Livro não encontrado' });
        }
        if (livroExistente.status === LivroStatus_1.LivroStatus.Lido) {
            return res.status(403).json({ message: 'Livros com status "Lido" não podem ser editados' });
        }
        Object.assign(livroExistente, req.body);
        const errors = await (0, class_validator_1.validate)(livroExistente);
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }
        const livroAtualizado = await livroRepository_1.LivroRepository.save(livroExistente);
        res.json(livroAtualizado);
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao editar livro' });
    }
});
router.delete('/excluir/:id', async (req, res) => {
    try {
        const userId = req.user.id;
        const livroId = parseInt(req.params.id);
        const livroExistente = await livroRepository_1.LivroRepository.findOne({ where: { id: livroId, id_leitor: userId } });
        if (!livroExistente) {
            return res.status(404).json({ message: 'Livro não foi encontrado' });
        }
        await livroRepository_1.LivroRepository.remove(livroExistente);
        res.json({ message: 'Livro excluído com sucesso' });
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao excluir livro' });
    }
});
exports.default = router;
