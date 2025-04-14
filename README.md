
# ✨ Task Gamify - Sistema de Tarefas com Gamificação

É uma aplicação web com gamificação, onde usuários/funcionários criam e concluem tarefas ganhando pontos, e administradores validam as atividades, acompanham o desempenho e gerenciam o ranking da equipe podendo ter um maior gerenciamento de datas cumpridas e dentre outras informações importantes.
---

## 🚀 Tecnologias Utilizadas

-  **Frontend:** React.js (JSX + CSS) ⚛
-  **Backend:** Node.js com Express.js
-  **Banco de Dados:** SQLite com Sequelize ORM
-  **Autenticação:** JWT (JSON Web Token)
-  **Segurança de Senha:** bcryptjs
-  **Gerenciamento de Rotas:** react-router-dom
-  **HTTP Client:** Axios

---

## ✅ Funcionalidades Implementadas

### Funcionalidades principais
- ✍️ Cadastro e login de usuários
- 🧑‍💻 Atribuição de cargos (UI/UX, FullStack, Cientista de Dados, Administrador)
- 🔐 Autenticação e navegação segura
- 🏠 Painel de usuário com:
  - Criação de tarefas com prioridade e prazo
  - Visualização de tarefas por status
  - Conclusão de tarefas
  - Edição de perfil com alteração de nome, email, cargo e senha
- 🛠️ Painel administrativo (usuário master):
  - Aprovação de tarefas concluídas
  - Atribuição de pontuação automática
  - Ranking de usuários por pontos

### Funcionalidades bônus
- 📱 Interface responsiva
- 🎨 Emojis e visuais amigáveis
- 🖌️ Fundo com gradiente azul/branco

---

## 🛠️ Como Usar o Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/task-gamify.git
cd task-gamify
```

### 2. Instale as dependências do backend

```bash
cd backend
npm install
```

### 3. Sincronize o banco de dados

```bash
node sync.js
```

### 4. Inicie o backend

```bash
npm start
```

Backend rodando em `http://localhost:3000`

### 5. Instale o frontend

```bash
cd ../frontend
npm install
```

### 6. Inicie o frontend

```bash
npm start
```

Frontend rodando em `http://localhost:3001`

---

## 🧪 Testes no Postman (opcional)

Rotas úteis:
- `POST /api/users/register`
- `POST /api/users/login`
- `GET /api/users/profile/:id`
- `PUT /api/users/update/:id`
- `PATCH /api/users/picture/:id`
- `POST /api/tasks/create`
- `PATCH /api/tasks/complete/:taskId`
- `PATCH /api/tasks/admin/aprovar/:taskId`

---

## ⚙️ Ambiente

Crie um arquivo `.env` (caso não tenha sido clonado) na raiz do backend com:

```
SECRET_KEY=minhaChaveSuperSecreta123
```

---

## 📸 Gif's do Projeto
- Cadastro:

![Cadastro](https://github.com/user-attachments/assets/2ca9b717-f502-4894-bfc4-cebc48c7877f)


- Painel de Tarefas (criando tarefa, editando perfil e saindo):

![Painel-Tarefas](https://github.com/user-attachments/assets/ae2b6ee8-842c-4573-aeba-010b7398e8bb)


- Login / Painel do Admin (fazendo login, concluindo tarefa e vendo pontuações):

![Login](https://github.com/user-attachments/assets/075b19ab-8466-4ed4-86fd-b4238729ead8)




---

## ❌ O que ficou faltando

- [ ] Adicionar ou alterar foto de perfil.
- [ ] Testes automatizados (Manuais apenas)

---

## 📆 Histórico de Desenvolvimento

| 📅 Data       | 🧩 Implementação                                                                 |
|--------------|----------------------------------------------------------------------------------|
| 11/04/2025   | Criação inicial do backend                                                       |
| 11/04/2025   | Rotas de tarefas e dashboard                                                     |
| 12/04/2025   | Painel admin e ranking                                                           |
| 12/04/2025   | Visual e layout                                                  |
| 13/04/2025   | Refatoração completa do frontend                                                 |
| 13/04/2025   | Revisões finais, organização e entrega no GitHub                                 |

---

## 👨‍💻 Desenvolvido por

**Matheus Camargos**  
Desafio BlueOcean - Sistema de Tarefas com Gamificação  
