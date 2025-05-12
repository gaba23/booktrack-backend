"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Livro = void 0;
const typeorm_1 = require("typeorm");
const LivroStatus_1 = require("../types/LivroStatus");
const class_validator_1 = require("class-validator");
const User_1 = require("./User");
let Livro = class Livro {
    updateDataConclusao() {
        if (this.status === LivroStatus_1.LivroStatus.Lido && !this.data_conclusao) {
            this.data_conclusao = new Date();
        }
    }
};
exports.Livro = Livro;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Livro.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    (0, class_validator_1.Length)(3, 100, { message: 'O título deve ter entre 3 e 100 caracteres' }),
    __metadata("design:type", String)
], Livro.prototype, "titulo", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Livro.prototype, "autor", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: LivroStatus_1.LivroStatus,
        default: LivroStatus_1.LivroStatus.QueroLer
    }),
    __metadata("design:type", String)
], Livro.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_validator_1.ValidateIf)((o) => o.status === LivroStatus_1.LivroStatus.Lido),
    (0, class_validator_1.Min)(1, { message: 'A avaliação deve ser no mínimo 1' }),
    (0, class_validator_1.Max)(5, { message: 'A avaliação deve ser no máximo 5' }),
    __metadata("design:type", Number)
], Livro.prototype, "avaliacao", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Livro.prototype, "data_conclusao", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Livro.prototype, "id_leitor", void 0);
__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Livro.prototype, "updateDataConclusao", null);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.livros),
    (0, typeorm_1.JoinColumn)({ name: 'id_leitor' }),
    __metadata("design:type", User_1.User)
], Livro.prototype, "leitor", void 0);
exports.Livro = Livro = __decorate([
    (0, typeorm_1.Entity)()
], Livro);
