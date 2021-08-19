require('colors')
const { Client, Collection } = require('eris')
const { devtoken } = require('../../config/config.js')

const client = new Client(devtoken, {
  restMode: true,
  autoreconnect: true,
  rest: {
    baseURL: '/api/v9'
  }
})

client.commands = new Collection()
client.aliases = new Collection()
client.events = new Collection()

global.dev = client

require('./client/handler/comandos')
require('./client/handler/eventos')

client.connect()
