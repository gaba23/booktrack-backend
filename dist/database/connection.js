"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const client = new pg_1.Client({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});
client.connect()
    .then(() => console.log('Conectado ao banco de dados'))
    .catch((err) => console.error('Erro ao conectar ao banco de dados', err));
exports.default = client;
