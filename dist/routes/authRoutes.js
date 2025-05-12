"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userService_1 = require("../services/userService");
const router = express_1.default.Router();
router.post('/register', async (req, res) => {
    try {
        const { nome, email, senha } = req.body;
        const result = await userService_1.UserService.register(nome, email, senha);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
router.post('/login', async (req, res) => {
    try {
        const { email, senha } = req.body;
        const result = await userService_1.UserService.login(email, senha);
        res.json(result);
    }
    catch (error) {
        res.status(401).json({ error: error.message });
    }
});
exports.default = router;
