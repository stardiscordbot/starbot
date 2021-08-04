module.exports = class PingCommand {
  constructor () {
    return {
      permissoes: {
        membro: [], // Permissoes que o usuario necessita
        bot: [], // Permissoes que o bot necessita
        dono: false // Se apenas nos devs podem usar o comando
      },
      pt: {
        nome: 'nodes',
        categoria: '📖 • Informação',
        desc: 'Envia algumas informações sobre os nodes de lavalink'
      },
      en: {
        nome: 'nodes',
        categoria: '📖 • Information',
        desc: 'Sends you some Informations about our Nodes'
      },
      aliases: ['lavalink', 'nodesinfo'],
      run: this.run
    }
  }

  async run (ctx) {
    function msToTime (s) {
      const ms = s % 1000
      s = (s - ms) / 1000
      const secs = s % 60
      s = (s - secs) / 60
      const mins = s % 60
      const hrs = (s - mins) / 60

      return hrs + ':' + mins + ':' + secs + '.' + ms
    }
    function bytesToSize (bytes) {
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
      if (bytes === 0) return '0 Byte'
      const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
      return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i]
    }
    const embed = new global.star.manager.Ebl()
    embed.title(`🎶 Lavalink | ${global.star.user.username}`)
    embed.color('#dd3af0')
    global.star.music.nodes.forEach(node => {
      embed.field(`🎧 ${node.options.name}`, `>>> **⏯️ Players:**\n${node.stats.playingPlayers}\n**⏳ Memory:**\n${bytesToSize(node.stats.memory.used)}/${bytesToSize(node.stats.memory.allocated)} - Free ${bytesToSize(node.stats.memory.free)}\n**⌚️ Uptime:**\n${msToTime(node.stats.uptime)}`, true)
    })
    embed.thumbnail(global.star.user.avatarURL)
    ctx.send(embed.create)
  }
}

// ADG, Davi e LRD
