require('colors')
const {
  spotify
} = require('../../config/player')
const {
  Manager
} = require('erela.js')

const nodes = require('./nodes')
const Deezer = require('erela.js-deezer')
const Spotify = require('erela.js-spotify')

const clientID = spotify.id
const clientSecret = spotify.secret

require('./StarPlayer')
global.star.music = new Manager({
  nodes: nodes,
  plugins: [
    new Deezer(),
    new Spotify({
      clientID,
      clientSecret
    })
  ],
  autoPlay: true,
  send (id, payload) {
    const guild = global.star.guilds.get(id)
    if (guild) guild.shard.sendWS(payload.op, payload.d)
  }
})
  .on('nodeConnect', node => console.log(`[LAVALINK] Node ${node.options.name} conectado`.green))
  .on('nodeError', (node, error) => console.log(`[LAVALINK] Node ${node.options.name} teve um erro: ${error.message}`.red))
  .on('playerCreate', (player) => {
    player.set('rateLimitStatus', { status: false })
    player.set('24h', { status: false })
  })
  .on('trackStart', async (player, track) => {
    const ch = await global.star.getRESTChannel(player.textChannel)
    let idioma = require('../../config/idiomas.js')
    let lang = (await global.db.get(`idioma-${ch.guild.id}`)) || 'pt_br'
    lang = lang.replace(/-/g, '_')
    idioma = idioma[lang]

    const embed = new global.star.manager.Ebl()
    embed.title(idioma.erela.np)
    embed.description(`<:st_playing:861592704958201896> \`${track.title}: ${track.requester.username}#${track.requester.discriminator}\``)
    embed.color('#dd3af0')
    embed.thumbnail(global.star.user.avatarURL)
    ch.createMessage(embed.create).then(a => {
      setTimeout(() => {
        a.delete()
      }, 3000)
    })
  })
  .on('queueEnd', async (player) => {
    const ch = await global.star.getRESTChannel(player.textChannel)
    let idioma = require('../../config/idiomas.js')
    let lang = (await global.db.get(`idioma-${ch.guild.id}`)) || 'pt_br'
    lang = lang.replace(/-/g, '_')
    idioma = idioma[lang]

    const embed = new global.star.manager.Ebl()
    embed.title(`🛑 ${idioma.erela.endt}`)
    embed.description(`${idioma.erela.end}`)
    embed.color('#dd3af0')
    embed.thumbnail(global.star.user.avatarURL)
    ch.createMessage(embed.create)
    player.destroy()
  })
