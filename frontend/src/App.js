import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// Configuração do axios
axios.defaults.baseURL = 'http://localhost:3002';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

function App() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await axios.post('/api/chat', {
        question: inputValue
      });

      if (!response.data || !response.data.answer) {
        throw new Error('Resposta inválida do servidor');
      }

      const botMessage = {
        id: Date.now() + 1,
        text: response.data.answer,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, botMessage]);
      setErrorMessage('');
    } catch (err) {
      console.error('Erro ao enviar mensagem:', err);
      
      let errorText = 'Erro ao processar sua pergunta. Tente novamente.';
      
      if (err.response?.data?.error) {
        errorText = err.response.data.error;
      } else if (err.message) {
        errorText = err.message;
      }

      setErrorMessage(errorText);
      
      const errorBotMessage = {
        id: Date.now() + 1,
        text: errorText,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString(),
        isError: true
      };

      setMessages(prev => [...prev, errorBotMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setErrorMessage('');
  };

  const exampleQuestions = [
    "Como funciona o algoritmo de ordenação quicksort?",
    "Qual a diferença entre React e Vue.js?",
    "Como implementar uma API REST em Node.js?",
    "O que são Design Patterns em programação?",
    "Como funciona o Docker?",
    "Qual a diferença entre SQL e NoSQL?"
  ];

  const askExample = (question) => {
    setInputValue(question);
  };

  return (
    <div className="App">
      <div className="chat-container">
        <header className="chat-header">
          <div className="header-content">
            <h1>💻 Tech Assistant</h1>
            <p>Especialista em Tecnologia e Programação</p>
            <button onClick={clearChat} className="clear-btn">
              🗑️ Limpar Chat
            </button>
          </div>
        </header>

        <div className="chat-messages">
          {messages.length === 0 && (
            <div className="welcome-message">
              <h2>👋 Bem-vindo!</h2>
              <p>Faça perguntas sobre:</p>
              <ul>
                <li>🔧 Linguagens de Programação</li>
                <li>⚛️ Frameworks e Bibliotecas</li>
                <li>🗄️ Bancos de Dados</li>
                <li>🌐 Desenvolvimento Web</li>
                <li>📱 Desenvolvimento Mobile</li>
                <li>☁️ Cloud Computing</li>
                <li>🤖 Inteligência Artificial</li>
              </ul>
              
              <div className="example-questions">
                <h3>💡 Perguntas de exemplo:</h3>
                <div className="examples-grid">
                  {exampleQuestions.map((question, index) => (
                    <button
                      key={index}
                      className="example-btn"
                      onClick={() => askExample(question)}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`message ${message.sender} ${message.isError ? 'error' : ''}`}
            >
              <div className="message-content">
                <div className="message-text">
                  {message.text.split('\n').map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                </div>
                <div className="message-time">{message.timestamp}</div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="message bot loading">
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div className="message-text">Processando sua pergunta...</div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={sendMessage} className="chat-input-form">
          <div className="input-container">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Digite sua pergunta sobre tecnologia e programação..."
              disabled={isLoading}
              className="chat-input"
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="send-btn"
            >
              {isLoading ? '⏳' : '🚀'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;