# BookTrack - Backend

API para gerenciamento de leituras, desenvolvida com TypeScript, Express e TypeORM.

## 🚀 Tecnologias

- Node.js
- TypeScript
- Express
- TypeORM
- PostgreSQL
- JWT para autenticação
- Class Validator para validações

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- PostgreSQL
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone [https://github.com/gaba23/booktrack-backend]
cd booktrack/back
```

2. Instale as dependências:
```bash
npm install
```

3. Configure o arquivo `.env` na raiz do projeto:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=seu_usuario
DB_PASSWORD=sua_senha
DB_DATABASE=booktrack
JWT_SECRET=sua_chave_secreta
```

4. Crie o banco de dados:
```bash
createdb booktrack
```

## 🚀 Executando o projeto

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm run build
npm run start
```

## 📚 Rotas da API

### Autenticação
```http
POST /auth/register
POST /auth/login
```

### Usuários
```http
GET /users/listar
DELETE /users/deletar/:id
```

### Livros
```http
GET /livros/meus-livros
POST /livros/adicionar
PUT /livros/editar/:id
DELETE /livros/excluir/:id
```

## 🔐 Autenticação

A maioria das rotas requer autenticação via JWT. Para autenticar:

1. Faça login ou registro para obter o token
2. Inclua o token no header das requisições:
```
Authorization: Bearer seu_token_aqui
```

## 📝 Exemplos de Uso

### Registro de Usuário
```http
POST /auth/register
Content-Type: application/json

{
    "nome": "Seu Nome",
    "email": "seu@email.com",
    "senha": "suasenha123"
}
```

### Login
```http
POST /auth/login
Content-Type: application/json

{
    "email": "seu@email.com",
    "senha": "suasenha123"
}
```

### Adicionar Livro
```http
POST /livros/adicionar
Authorization: Bearer seu_token_aqui
Content-Type: application/json

{
    "titulo": "Nome do Livro",
    "autor": "Nome do Autor",
    "status": "QueroLer"
}
```

Em BookTrack.postman_colletion.json você pode visualizar o json gerado pelo postman com as rotas da api desta aplicação
