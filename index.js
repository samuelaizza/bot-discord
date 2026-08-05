require('dotenv').config();
const { Client, GatewayIntentBits, ActivityType } = require('discord.js');

// Configuração do cliente do bot
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent, // Requer que a opção "Message Content Intent" esteja ATIVADA no Developer Portal
  ],
});

// Evento executado quando o bot se conecta com sucesso
client.once('clientReady', (c) => {
  console.log(`✅ Bot online como ${c.user.tag}`);
  
  // Define o status do bot
  c.user.setActivity({
    name: 'comandos no servidor',
    type: ActivityType.Watching,
  });
});

// Evento de leitura de mensagens
client.on('messageCreate', async (message) => {
  // Ignora mensagens enviadas por outros bots ou mensagens privadas
  if (message.author.bot || !message.guild) return;

  // Comando simples de ping
  if (message.content === '!ping') {
    return message.reply(`🏓 Pong! A latência atual é de ${client.ws.ping}ms.`);
  }

  // Exemplo de outro comando
  if (message.content === '!oi') {
    return message.reply(`Olá, ${message.author}! Como posso ajudar?`);
  }
});

// Tratamento de erros para evitar que a aplicação caia sem avisar
process.on('unhandledRejection', (reason, promise) => {
  console.error(' [Erro Não Tratado]:', reason);
});

process.on('uncaughtException', (error) => {
  console.error(' [Exceção Capturada]:', error);
});

// Inicialização do Bot usando a variável de ambiente
client.login(process.env.DISCORD_TOKEN);