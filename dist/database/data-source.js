"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("dotenv/config");
const typeorm_1 = require("typeorm");
const User_1 = require("../entities/User");
const Livro_1 = require("../entities/Livro");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    url: process.env.DB_URL,
    synchronize: true,
    logging: true,
    entities: [User_1.User, Livro_1.Livro],
    migrations: [],
    subscribers: [],
    ssl: true,
    extra: {
        ssl: {
            rejectUnauthorized: false
        },
        connectionTimeoutMillis: 5000,
        idleTimeoutMillis: 30000
    },
    poolSize: 10
});
