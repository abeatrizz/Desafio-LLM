const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// Configuração da API do Gemini
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

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
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        error: 'Pergunta é obrigatória',
        code: 'MISSING_QUESTION'
      });
    }

    if (!GEMINI_API_KEY) {
      return res.status(500).json({
        error: 'Chave da API do Gemini não configurada',
        code: 'MISSING_API_KEY'
      });
    }

    // Verificar se a pergunta está relacionada ao tema
    if (!isValidTopic(question)) {
      return res.status(400).json({
        error: 'Esta API responde apenas perguntas sobre Tecnologia e Programação. Tente perguntas sobre desenvolvimento de software, linguagens de programação, frameworks, bancos de dados, etc.',
        code: 'INVALID_TOPIC'
      });
    }

    // Preparar o prompt
    const prompt = createTechPrompt(question);

    // Fazer requisição para o Gemini
    const geminiResponse = await axios.post(GEMINI_API_URL, {
      contents: [{
        parts: [{
          text: prompt
        }]
      }]
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 30000
    });

    const answer = geminiResponse.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!answer) {
      throw new Error('Resposta inválida da API do Gemini');
    }

    res.json({
      question,
      answer,
      topic: 'Tecnologia e Programação',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Erro na API:', error.message);
    
    if (error.response?.status === 400) {
      return res.status(400).json({
        error: 'Pergunta inválida ou muito longa',
        code: 'INVALID_REQUEST'
      });
    }
    
    if (error.response?.status === 429) {
      return res.status(429).json({
        error: 'Muitas requisições. Tente novamente em alguns segundos.',
        code: 'RATE_LIMIT'
      });
    }

    res.status(500).json({
      error: 'Erro interno do servidor',
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