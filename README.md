# 💻 Tech Assistant - Chat IA Especializado

Um chat inteligente especializado em **Tecnologia e Programação** usando a API do Google Gemini 1.5 Flash.

## 🚀 Funcionalidades

- ✅ Chat em tempo real com IA especializada em tecnologia
- ✅ Interface moderna e responsiva
- ✅ Validação de tópicos relacionados à área tech
- ✅ Exemplos de perguntas pré-definidas
- ✅ Tratamento de erros e loading states
- ✅ Design mobile-first
- ✅ Powered by Gemini 1.5 Flash para respostas rápidas e precisas

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **Google Generative AI** - SDK oficial do Google Gemini
- **CORS** - Controle de origem cruzada
- **Helmet** - Segurança
- **dotenv** - Variáveis de ambiente

### Frontend
- **React** - Biblioteca UI
- **CSS3** - Estilização moderna
- **Axios** - Requisições HTTP

### IA
- **Google Gemini 1.5 Flash** - Modelo de IA rápido e eficiente

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- NPM ou Yarn
- Chave da API do Google Gemini (gratuita)

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

1. Acesse [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Faça login com sua conta Google
3. Clique em "Create API Key"
4. Copie a chave gerada
5. Cole no arquivo `.env` do backend

> **Nota**: A API do Gemini tem uma cota gratuita generosa para desenvolvimento.

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
4. A IA responderá com informações especializadas usando Gemini 1.5 Flash

### Exemplos de Perguntas
- "Como funciona o algoritmo de ordenação quicksort?"
- "Qual a diferença entre React e Vue.js?"
- "Como implementar uma API REST em Node.js?"
- "O que são Design Patterns em programação?"
- "Explique o conceito de closures em JavaScript"
- "Como otimizar performance em aplicações React?"

## 📁 Estrutura do Projeto

```
gemini-chat-project/
├── backend/
│   ├── server.js          # Servidor Express + Gemini 1.5 Flash
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

## 🤖 Configuração do Gemini

O projeto utiliza o **Gemini 1.5 Flash** por suas vantagens:

- ⚡ **Velocidade**: Respostas mais rápidas
- 💰 **Custo-efetivo**: Menor custo por requisição
- 🎯 **Especialização**: Otimizado para conversas técnicas
- 📚 **Contexto amplo**: Suporte a grandes contextos

### Exemplo de configuração no backend:
```javascript
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ 
  model: "gemini-1.5-flash",
  generationConfig: {
    temperature: 0.7,
    topP: 0.8,
    maxOutputTokens: 2048,
  }
});
```

## 🔒 Segurança

- Headers de segurança com Helmet
- Validação de entrada sanitizada
- Rate limiting (implementável)
- CORS configurado adequadamente
- Variáveis de ambiente protegidas
- Chave da API nunca exposta no frontend

## 🐛 Tratamento de Erros

- Validação de tópicos válidos
- Mensagens de erro amigáveis
- Fallback para falhas da API Gemini
- Loading states informativos
- Retry automático em falhas temporárias

## 🎨 Design Features

- Interface moderna e intuitiva
- Gradientes e animações suaves
- Responsivo (mobile-first)
- Tema escuro/claro (expansível)
- Scrollbar personalizada
- Indicador de typing em tempo real

## 📊 API Endpoints

### `GET /api/health`
Verifica o status da API e conectividade com Gemini
```json
{
  "status": "ok",
  "gemini": "connected",
  "model": "gemini-1.5-flash"
}
```

### `POST /api/chat`
Envia pergunta para o Gemini 1.5 Flash
```json
{
  "question": "Como funciona o React Hooks?"
}
```

**Resposta:**
```json
{
  "response": "React Hooks são funções especiais...",
  "model": "gemini-1.5-flash",
  "timestamp": "2025-06-09T10:30:00Z"
}
```

## 🚀 Deploy

### Railway (Backend)
```bash
# Conecte seu repositório ao Railway
# Configure a variável GEMINI_API_KEY no dashboard
railway up
```

### Vercel (Frontend)
```bash
cd frontend
npm run build
vercel --prod
```

### Render (Alternativa)
- Configure as variáveis de ambiente
- Deploy automático via GitHub

## ⚡ Performance

- Gemini 1.5 Flash: ~200ms de latência média
- Caching de respostas frequentes (implementável)
- Compressão gzip habilitada
- Otimização de bundle do React

## 🧪 Testes

```bash
# Backend
cd backend
npm test

# Frontend
cd frontend
npm test
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

### Diretrizes de Contribuição
- Mantenha o foco em tópicos de tecnologia
- Teste com diferentes tipos de perguntas
- Documente mudanças na API
- Siga os padrões de código estabelecidos

## 📄 Licença

Este projeto está sob a licença MIT. 

## 🔗 Links Úteis

- [Documentação do Gemini](https://ai.google.dev/docs)
- [Google AI Studio](https://aistudio.google.com/)
- [SDK Google Generative AI](https://www.npmjs.com/package/@google/generative-ai)

## 👨‍💻 Autor

**Seu Nome**
- GitHub: [@abeatrizz]((https://github.com/abeatrizz))

> **Desenvolvido com Gemini 1.5 Flash para máxima performance e precisão** 🚀
