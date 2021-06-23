// Cores
require('colors')

// Código rs
const {
  Client,
  Collection
} = require('eris')

// Iniciando a star.
const {
  token
} = require('./config/config.js')

const client = new Client(token, {
  restMode: true,
  defaultImageSize: 2048,
  defaultImageFormat: 'png',
  autoreconnect: true,
  rest: {
    baseURL: '/api/v9'
  },
  maxShards: 'auto'
})

client.commands = new Collection()
client.aliases = new Collection()
client.events = new Collection()

const Star = require('./client/starbot.js')

const StarBot = new Star(client)

StarBot.iniciar().then((star) => {
  console.log(`[CLIENT] ${star}, Tudo Carregado!`.dim.brightMagenta)
})

global.star = client
global.star.manager = StarBot

global.db = require('star-database-manager')

// Handler.
require('./client/handler/comandos.js')
require('./client/handler/eventos.js')
require('./client/plugins/lavalinkManager')
// LRD
