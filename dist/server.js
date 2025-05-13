"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const data_source_1 = require("./database/data-source");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const livroRoutes_1 = __importDefault(require("./routes/livroRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const authMiddleware_1 = require("./middlewares/authMiddleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
// Configuração do CORS
app.use((0, cors_1.default)({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
// Middleware para processar JSON
app.use(express_1.default.json());
// Rotas
app.use('/auth', authRoutes_1.default);
app.use('/livros', authMiddleware_1.authMiddleware, livroRoutes_1.default);
app.use('/users', authMiddleware_1.authMiddleware, userRoutes_1.default);
// Tratamento de erros global
app.use((err, req, res, next) => {
    res.status(500).json({
        error: 'Erro interno do servidor',
        message: err.message
    });
});
data_source_1.AppDataSource.initialize().then(() => {
    app.listen(3001, () => {
        console.log('Servidor rodando na porta 3001');
    });
}).catch((err) => {
    console.error('Erro ao conectar com o banco:', err);
});
