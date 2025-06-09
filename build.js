// Script para automatizar o build do projeto completo
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Iniciando build do projeto DESAFIO-LLM...\n');

// Função para executar comandos
function runCommand(command, cwd = process.cwd()) {
  try {
    console.log(`📁 Executando em ${cwd}: ${command}`);
    execSync(command, { cwd, stdio: 'inherit' });
    console.log('✅ Comando executado com sucesso!\n');
  } catch (error) {
    console.error(`❌ Erro ao executar: ${command}`);
    console.error(error.message);
    process.exit(1);
  }
}

// Verificar se estamos na raiz do projeto
const projectRoot = process.cwd();
const backendPath = path.join(projectRoot, 'backend');
const frontendPath = path.join(projectRoot, 'frontend');

// Verificar estrutura do projeto
if (!fs.existsSync(backendPath) || !fs.existsSync(frontendPath)) {
  console.error('❌ Estrutura do projeto incorreta. Execute na raiz do projeto DESAFIO-LLM');
  process.exit(1);
}

try {
  // Build do Frontend
  console.log('🎨 Fazendo build do Frontend...');
  runCommand('npm run build', frontendPath);
  
  console.log('🎉 Build concluído com sucesso!');
  console.log('📦 Arquivos de produção criados em: frontend/build/');
  console.log('\n📋 Próximos passos:');
  console.log('1. Configure seu backend em produção');
  console.log('2. Faça deploy da pasta frontend/build/');
  console.log('3. Atualize a variável REACT_APP_API_URL no .env de produção');
  
} catch (error) {
  console.error('❌ Erro durante o build:', error.message);
  process.exit(1);
}