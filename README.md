# 💻 Tech Assistant - Chat IA Especializado

Um chat inteligente especializado em **Tecnologia e Programação** usando a API do Google Gemini.

## 🚀 Funcionalidades

- ✅ Chat em tempo real com IA especializada em tecnologia
- ✅ Interface moderna e responsiva
- ✅ Validação de tópicos relacionados à área tech
- ✅ Exemplos de perguntas pré-definidas
- ✅ Tratamento de erros e loading states
- ✅ Design mobile-first

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **Axios** - Cliente HTTP
- **CORS** - Controle de origem cruzada
- **Helmet** - Segurança
- **dotenv** - Variáveis de ambiente

### Frontend
- **React** - Biblioteca UI
- **CSS3** - Estilização moderna
- **Axios** - Requisições HTTP

## 📋 Pré-requisitos

- Node.js (versão 16 ou superior)
- NPM ou Yarn
- Chave da API do Google Gemini

## 🔧 Instalação

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/gemini-chat-project.git
cd gemini-chat-project
```

### 2. Configure o Backend
```bash
cd backend
npm install
```

### 3. Configure as variáveis de ambiente
```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Edite o arquivo .env e adicione sua chave do Gemini
# GEMINI_API_KEY=sua_chave_aqui
```

### 4. Configure o Frontend
```bash
cd ../frontend
npm install
```

## 🔑 Obtendo a Chave da API do Gemini

1. Acesse [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Faça login com sua conta Google
3. Clique em "Create API Key"
4. Copie a chave gerada
5. Cole no arquivo `.env` do backend

## 🚀 Executando o Projeto

### Terminal 1 - Backend
```bash
cd backend
npm start
# ou para desenvolvimento:
npm run dev
```

### Terminal 2 - Frontend
```bash
cd frontend
npm start
```

## 📱 Acesso

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:3001
- **API Health**: http://localhost:3001/api/health

## 🎯 Como Usar

1. Abra o navegador em `http://localhost:3000`
2. Digite perguntas sobre tecnologia e programação
3. Use os exemplos fornecidos ou crie suas próprias perguntas
4. A IA responderá com informações especializadas

### Exemplos de Perguntas
- "Como funciona o algoritmo de ordenação quicksort?"
- "Qual a diferença entre React e Vue.js?"
- "Como implementar uma API REST em Node.js?"
- "O que são Design Patterns em programação?"

## 📁 Estrutura do Projeto

```
gemini-chat-project/
├── backend/
│   ├── server.js          # Servidor Express
│   ├── package.json       # Dependências do backend
│   └── .env              # Variáveis de ambiente
├── frontend/
│   ├── src/
│   │   ├── App.js        # Componente principal
│   │   ├── App.css       # Estilos principais
│   │   └── index.js      # Ponto de entrada
│   ├── public/
│   │   └── index.html    # HTML base
│   └── package.json      # Dependências do frontend
└── README.md
```

## 🔒 Segurança

- Headers de segurança com Helmet
- Validação de entrada
- Rate limiting (implementável)
- CORS configurado
- Variáveis de ambiente protegidas

## 🐛 Tratamento de Erros

- Validação de tópicos válidos
- Mensagens de erro amigáveis
- Fallback para falhas da API
- Loading states

## 🎨 Design Features

- Interface moderna e intuitiva
- Gradientes e animações suaves
- Responsivo (mobile-first)
- Tema escuro/claro (expansível)
- Scrollbar personalizada

## 📊 API Endpoints

### `GET /api/health`
Verifica o status da API

### `POST /api/chat`
Envia pergunta para o Gemini
```json
{
  "question": "Como funciona o React?"
}
```

## 🚀 Deploy

### Heroku (Backend)
```bash
git subtree push --prefix backend heroku main
```

### Vercel (Frontend)
```bash
cd frontend
npm run build
# Deploy via Vercel CLI ou interface web
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Seu Nome**
- GitHub: [@seu-usuario](https://github.com/seu-usuario)
- LinkedIn: [Seu Perfil](https://linkedin.com/in/seu-perfil)

## 🙏 Agradecimentos

- Google pela API Gemini
- Comunidade React
- Comunidade Node.js

---

⭐ Se este projeto te ajudou, considere dar uma estrela no repositório!