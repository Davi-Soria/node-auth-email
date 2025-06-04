# 🔐 Node.js Auth API - Autenticação em Duas Etapas com Email

API de autenticação com verificação em duas etapas (2FA) via email, utilizando:

- **Node.js + TypeScript**
- **Express**
- **JWT + Passport**
- **Sequelize + PostgreSQL**
- **Envio de email para verificação**

---

## 🚀 Funcionalidades

- Registro de usuários com email e senha
- Geração e envio de código de verificação por email
- Validação do código de duas etapas
- Login seguro com JWT
- Proteção de rotas autenticadas
- Hash de senhas com `bcryptjs`

---

## 📁 Estrutura do Projeto

src/
├── config/ # Conexão com banco e config do Sequelize
├── controller/ # Lógica dos endpoints
├── model/ # Models do Sequelize
├── routes/ # Rotas da aplicação
└── server.ts # Ponto de entrada da API

yaml
Copiar
Editar

---

## ⚙️ Tecnologias e Pacotes

- [Node.js](https://nodejs.org)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [Sequelize](https://sequelize.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Passport + JWT](http://www.passportjs.org/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)

---

## ✅ Pré-requisitos

- Node.js v18+
- PostgreSQL rodando localmente
- Conta de email (ex: Gmail) com app password (para envio de códigos)

---

## 🔧 Como rodar o projeto

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/auth-email-2fa.git
cd auth-email-2fa

# Instale as dependências
npm install

# Configure variáveis de ambiente
cp .env.example .env
# Preencha as variáveis no arquivo .env

# Inicie o servidor em modo dev
npm run dev
🌐 Rotas principais
Método	Rota	Descrição
POST	/register	Criação de novo usuário
POST	/verify	Validação do código 2FA enviado por email
POST	/login	Login com JWT após verificação
GET	/protected	Rota protegida (requer JWT)

📧 Variáveis de ambiente (.env)
env
Copiar
Editar
PORT=3000
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=auth_email
DB_PORT=5432

JWT_SECRET=sua_chave_jwt
EMAIL_USER=seuemail@gmail.com
EMAIL_PASS=sua_senha_de_app
🛠️ Em desenvolvimento
Este projeto está em construção como exercício de aprendizado em backend com autenticação avançada.

🧑‍💻 Autor
Feito com 💻 por https://github.com/Davi-Soria

📄 Licença
MIT

yaml
Copiar
Editar

---

### ✅ Próximo passo

1. Salve isso em um arquivo chamado `README.md` na raiz do seu projeto.
2. Suba no GitHub com:

```bash
git init
git add .
git commit -m "init: projeto de auth com verificação por email"
git remote add origin https://github.com/seu-usuario/auth-email-2fa.git
git push -u origin main