const { Client, Collection, ChannelManager } = require('discord.js');
const config = require("./src/config/json/config.json");

const client = new Client({
  messageCacheMaxSize: 200,
  restTimeOffset: 50,
  //Intents: GUILDS, GUILD_MESSAGES e GUILD_MEMBERS
  ws: {
    intents: 1539
  },
    partials: [
      'MESSAGE',
      'CHANNEL',
      'REACTION'
    ]
})

client.commands = new Collection()

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
//Carregar sistema de reações
require("./utils/reactionroles")(client)
//Carregar sistema de multi idiomas
require("./utils/multiLanguage")(client)

client.login(config.discord.token)