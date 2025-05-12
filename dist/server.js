"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const data_source_1 = require("./database/data-source");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const livroRoutes_1 = __importDefault(require("./routes/livroRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/auth', authRoutes_1.default);
app.use('/livros', livroRoutes_1.default);
data_source_1.AppDataSource.initialize().then(() => {
    app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
}).catch((err) => console.error('Erro ao conectar com o banco:', err));
