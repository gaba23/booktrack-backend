"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkLivroOwner = void 0;
const data_source_1 = require("../database/data-source");
const Livro_1 = require("../entities/Livro");
const checkLivroOwner = async (req, res, next) => {
    try {
        const livroId = parseInt(req.params.id);
        const userId = req.user?.id;
        const livroRepo = data_source_1.AppDataSource.getRepository(Livro_1.Livro);
        const livro = await livroRepo.findOneBy({ id: livroId });
        if (!livro) {
            return res.status(404).json({ message: 'Livro não encontrado' });
        }
        if (livro.id_leitor !== userId) {
            return res.status(403).json({ message: 'Você não tem permissão para realizar esta ação' });
        }
        next();
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao verificar permissão' });
    }
};
exports.checkLivroOwner = checkLivroOwner;
