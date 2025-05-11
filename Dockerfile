# Use imagem oficial do Node
FROM node:18

# Diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependências primeiro
COPY package*.json ./
RUN npm install

# Copia todo o restante do projeto
COPY . .

# Exponha a porta da API
EXPOSE 3000

# Comando para rodar a API com hot-reload e TypeScript
CMD ["npm", "run", "dev"]
