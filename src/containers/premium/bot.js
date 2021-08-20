require('colors')
const { Client, Collection } = require('eris')
const { premiumtoken } = require('../../config/config.js')

const client = new Client(premiumtoken, {
  restMode: true,
  autoreconnect: true,
  rest: {
    baseURL: '/api/v9'
  },
  intents: [
    'guilds',
    'guildMessages'
  ]
})

client.commands = new Collection()
client.aliases = new Collection()
client.events = new Collection()

global.premium = client

// require('./client/handler/comandos')
require('./client/handler/eventos')

client.connect()
