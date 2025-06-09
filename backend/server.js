const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config({ path: './env.config' });

// Log para verificar as variáveis de ambiente
console.log('Variáveis de ambiente carregadas:');
console.log('PORT:', process.env.PORT);
console.log('GEMINI_API_KEY:', process.env.GEMINI_API_KEY ? 'Chave configurada' : 'Chave não encontrada');

const app = express();
const PORT = process.env.PORT || 3002;

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// Configuração da API do Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Função para filtrar perguntas relacionadas ao tema
const isValidTopic = (question) => {
  const techKeywords = [
    'programação', 'javascript', 'python', 'react', 'node', 'html', 'css',
    'banco de dados', 'api', 'frontend', 'backend', 'desenvolvimento',
    'algoritmo', 'estrutura de dados', 'inteligência artificial', 'machine learning',
    'tecnologia', 'software', 'hardware', 'web', 'mobile', 'app', 'aplicativo',
    'framework', 'biblioteca', 'git', 'github', 'docker', 'cloud', 'aws',
    'azure', 'google cloud', 'devops', 'agile', 'scrum', 'clean code',
    'arquitetura', 'microserviços', 'rest', 'graphql', 'sql', 'nosql'
  ];
  
  const questionLower = question.toLowerCase();
  return techKeywords.some(keyword => questionLower.includes(keyword));
};

// Função para fazer prompt contextualizado
const createTechPrompt = (userQuestion) => {
  return `Você é um especialista em Tecnologia e Programação. Responda a seguinte pergunta de forma clara, didática e técnica, focando em aspectos práticos e teóricos da área de tecnologia e desenvolvimento de software:

Pergunta: ${userQuestion}

Forneça uma resposta completa, incluindo exemplos quando apropriado, e mantenha o foco em tecnologia, programação, desenvolvimento de software, ou temas relacionados à área de TI.`;
};

// Rotas
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'API funcionando corretamente',
    timestamp: new Date().toISOString()
  });
});

app.post('/api/chat', async (req, res) => {
  try {
    console.log('Recebendo requisição:', req.body);
    const { question } = req.body;

    if (!question) {
      console.log('Erro: Pergunta não fornecida');
      return res.status(400).json({
        error: 'Pergunta é obrigatória',
        code: 'MISSING_QUESTION'
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      console.log('Erro: Chave da API não configurada');
      return res.status(500).json({
        error: 'Chave da API do Gemini não configurada',
        code: 'MISSING_API_KEY'
      });
    }

    console.log('Verificando tópico da pergunta:', question);
    if (!isValidTopic(question)) {
      console.log('Erro: Tópico inválido');
      return res.status(400).json({
        error: 'Esta API responde apenas perguntas sobre Tecnologia e Programação. Tente perguntas sobre desenvolvimento de software, linguagens de programação, frameworks, bancos de dados, etc.',
        code: 'INVALID_TOPIC'
      });
    }

    const prompt = createTechPrompt(question);
    console.log('Prompt preparado:', prompt);

    let retries = 3;
    let lastError = null;

    while (retries > 0) {
      try {
        console.log('Enviando requisição para o Gemini... (tentativa ' + (4 - retries) + ' de 3)');
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const answer = response.text();
        console.log('Resposta recebida do Gemini');

        if (!answer) {
          throw new Error('Resposta inválida da API do Gemini');
        }

        return res.json({
          question,
          answer,
          topic: 'Tecnologia e Programação',
          timestamp: new Date().toISOString()
        });
      } catch (error) {
        lastError = error;
        console.error('Erro na tentativa:', error.message);
        
        if (error.message.includes('429') || error.message.includes('quota')) {
          console.log('Limite de requisições atingido. Aguardando 20 segundos...');
          await new Promise(resolve => setTimeout(resolve, 20000)); // Espera 20 segundos
          retries--;
        } else {
          throw error; // Se for outro tipo de erro, não tenta novamente
        }
      }
    }

    // Se chegou aqui, todas as tentativas falharam
    throw lastError;

  } catch (error) {
    console.error('Erro detalhado na API:', error);
    console.error('Stack trace:', error.stack);
    
    if (error.message.includes('429') || error.message.includes('quota')) {
      return res.status(429).json({
        error: 'Limite de requisições atingido. Por favor, aguarde alguns minutos e tente novamente.',
        code: 'RATE_LIMIT',
        retryAfter: 20
      });
    }
    
    if (error.response?.status === 400) {
      return res.status(400).json({
        error: 'Pergunta inválida ou muito longa',
        code: 'INVALID_REQUEST'
      });
    }

    res.status(500).json({
      error: 'Erro interno do servidor: ' + error.message,
      code: 'INTERNAL_ERROR'
    });
  }
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Algo deu errado!',
    code: 'INTERNAL_ERROR'
  });
});

// Rota 404
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Rota não encontrada',
    code: 'NOT_FOUND'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📱 API Health: http://localhost:${PORT}/api/health`);
  console.log(`💬 Chat Endpoint: http://localhost:${PORT}/api/chat`);
});