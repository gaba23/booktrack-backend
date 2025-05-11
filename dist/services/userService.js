"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.addUser = void 0;
const connection_1 = __importDefault(require("../database/connection")); // Importa a conexão com o banco
// Função para adicionar um usuário
const addUser = async (name, email) => {
    try {
        const query = 'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *';
        const values = [name, email];
        const res = await connection_1.default.query(query, values);
        console.log('Usuário adicionado:', res.rows[0]);
        return res.rows[0];
    }
    catch (err) {
        console.error('Erro ao adicionar usuário:', err);
    }
};
exports.addUser = addUser;
// Função para listar todos os usuários
const getUsers = async () => {
    try {
        const res = await connection_1.default.query('SELECT * FROM users');
        console.log('Usuários encontrados:', res.rows);
        return res.rows;
    }
    catch (err) {
        console.error('Erro ao listar usuários:', err);
    }
};
exports.getUsers = getUsers;
