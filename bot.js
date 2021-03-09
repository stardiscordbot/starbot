const { Client, Collection, ChannelManager } = require('discord.js');
const dashboard = require("./src/config/json/dashboard.json");
const config = require("./src/config/json/config.json");

const client = new Client({
  messageCacheMaxSize: 200,
  restTimeOffset: 100,
  //Intents: GUILDS, GUILD_MESSAGES e GUILD_MEMBERS
  ws: {
    intents: 643
  },
  //Número de Shards
  shardCount: 1,
  //respawn: true
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

//Carregar sistema de música
require("./utils/LavalinkManager")(client)

//Carregar sistema de multi idiomas
require("./utils/multiLanguage")(client)

client.once("ready", () => {
  client.manager.init(client.user.id);
});

client.on("raw", (d) => 
client.manager.updateVoiceState(d)
);

client.login(config.discord.token)