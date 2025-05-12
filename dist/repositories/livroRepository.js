"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroRepository = void 0;
const data_source_1 = require("../database/data-source");
const Livro_1 = require("../entities/Livro");
class LivroRepository {
    static async findByUser(userId) {
        return data_source_1.AppDataSource.getRepository(Livro_1.Livro).find({
            where: { leitor: { id: userId } },
            relations: ['leitor']
        });
    }
    static async save(livro) {
        return data_source_1.AppDataSource.getRepository(Livro_1.Livro).save(livro);
    }
    static async findOne(options) {
        return data_source_1.AppDataSource.getRepository(Livro_1.Livro).findOne(options);
    }
    static async remove(livro) {
        await data_source_1.AppDataSource.getRepository(Livro_1.Livro).remove(livro);
    }
}
exports.LivroRepository = LivroRepository;
