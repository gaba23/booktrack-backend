"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const data_source_1 = require("../database/data-source");
const User_1 = require("../entities/User");
const authService_1 = require("../services/authService");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userRepo = data_source_1.AppDataSource.getRepository(User_1.User);
const register = async (req, res) => {
    const { nome, email, senha } = req.body;
    try {
        const exists = await userRepo.findOneBy({ email });
        if (exists)
            return res.status(400).json({ message: 'Email já cadastrado.' });
        const hashed = await (0, authService_1.hashPassword)(senha);
        const user = userRepo.create({ nome, email, senha: hashed });
        await userRepo.save(user);
        res.status(201).json({ message: 'Usuário criado com sucesso.' });
    }
    catch (err) {
        res.status(500).json({ error: 'Erro ao registrar usuário.' });
    }
};
exports.register = register;
const login = async (req, res) => {
    const { email, senha } = req.body;
    try {
        const user = await userRepo.findOneBy({ email });
        if (!user) {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }
        const valid = await (0, authService_1.comparePassword)(senha, user.senha);
        if (!valid) {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token });
    }
    catch (err) {
        res.status(500).json({ error: 'Erro ao fazer login.', details: err.message });
    }
};
exports.login = login;
