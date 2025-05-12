"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const livroRepository_1 = require("../repositories/livroRepository");
const router = express_1.default.Router();
router.get('/meus-livros', async (req, res) => {
    try {
        const userId = req.user.id;
        const livros = await livroRepository_1.LivroRepository.findByUser(userId);
        res.json(livros);
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao buscar livros' });
    }
});
exports.default = router;
