// Cores
require('colors')

// Código rs
const {
  Client,
  Collection
} = require('eris')

const {
  GiveawaysManager
} = require('eris-giveaways')

// Iniciando a star.
const {
  token
} = require('./config/config.js')
const DiscordTogether = require('./client/discord-together')

const client = new Client('Bot ' + token, {
  restMode: true,
  defaultImageSize: 2048,
  defaultImageFormat: 'png',
  autoreconnect: true,
  maxShards: 'auto',
  messageLimit: 200,
  rest: {
    baseURL: '/api/v9',
    domain: 'canary.discord.com'
  },
  intents: [
    'guilds',
    'guildMessages',
    'guildMessageReactions',
    'guildMembers',
    'guildVoiceStates'
  ]
})

client.discordTogether = new DiscordTogether(client)
client.giveawaysManager = new GiveawaysManager(client, {
  storage: './data/giveaways.json',
  updateCountdownEvery: 10000,
  default: {
    botsCanWin: false,
    embedColor: 14498544, // -2278672
    embedColorEnd: 14498544,
    reaction: '🎁'
  }
})

client.commands = new Collection()
client.aliases = new Collection()

client.slashcommands = new Collection()

client.events = new Collection()
client.cooldowns = new Collection()
client.cooldowns2 = new Collection()

const Star = require('./client/starbot.js')
const StarBot = new Star(client)

StarBot.iniciar().then((star) => {
  console.log(`[CLIENT] ${star}, Tudo Carregado!`.dim.brightMagenta)
})

global.star = client
global.star.manager = StarBot

// Database.
require('./database')

// Handler.
require('./client/handler/comandos.js')
require('./client/handler/eventos.js')
require('./client/plugins/lavalinkManager')
require('./containers/helper/bot')
require('./containers/developer/bot')
require('./containers/premium/bot')

// LRD
