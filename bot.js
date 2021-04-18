const { Client, Collection, ChannelManager } = require('discord.js');
const config = require("./src/config/json/config.json");

const client = new Client({
  messageCacheMaxSize: 200,
  restTimeOffset: 1,
  //Intents: GUILDS, GUILD_MESSAGES e GUILD_MEMBERS
  ws: {
    intents: 1539
  },
  //Partials
  partials: [
      'MESSAGE',
      'CHANNEL',
      'REACTION'
  ],
  //shardCount: 2
})

client.commands = new (require("discord.js")).Collection()
//Carregar comandos handler
require('./utils/commandHandler')(client)
//Carregar eventos handler
require('./utils/eventHandler')(client)
//Carregar DB
require('./utils/database')(client)
//Carregar Botlists
require('./utils/botlists')(client)
//Carregar DB2
require('./utils/database2')
//Carregar coisas úteis
require("./utils/Utils")(client)
//Carregar sistema de sorteios
require("./utils/giveaways")(client)
//Carregar sistema de Musica
require("./utils/LavalinkManager")(client)
//Carregar sistema de reações
require("./utils/reactionroles")(client)
//Carregar sistema de multi idiomas
require("./utils/multiLanguage")(client)

client.once('ready', () =>
     require('./SlashCommands')(client)
)

client.login(config.discord.token)