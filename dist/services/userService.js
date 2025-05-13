"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const data_source_1 = require("../database/data-source");
const User_1 = require("../entities/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserService {
    static async register(nome, email, senha) {
        const emailExistente = await this.userRepository.findOne({ where: { email } });
        if (emailExistente) {
            throw new Error('E-mail já está em uso');
        }
        const hashedPassword = await bcrypt_1.default.hash(senha, 10);
        const novoUsuario = this.userRepository.create({
            nome,
            email,
            senha: hashedPassword
        });
        await this.userRepository.save(novoUsuario);
        const token = jsonwebtoken_1.default.sign({ id: novoUsuario.id }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });
        return { user: novoUsuario, token };
    }
    static async login(email, senha) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new Error('E-mail não cadastrado');
        }
        const isPasswordValid = await bcrypt_1.default.compare(senha, user.senha);
        if (!isPasswordValid) {
            throw new Error('Senha incorreta');
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });
        return { user, token };
    }
}
exports.UserService = UserService;
UserService.userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
