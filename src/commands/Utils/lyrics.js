module.exports = class PingCommand {
  constructor () {
    return {
      permissoes: {
        membro: [], // Permissoes que o usuario necessita
        bot: [], // Permissoes que o bot necessita
        dono: false // Se apenas nos devs podem usar o comando
      },
      pt: {
        nome: 'lyrics',
        categoria: '🕰️ • Utilidades',
        desc: 'Veja as mensagens de algum usuário'
      },
      en: {
        nome: 'lyrics',
        categoria: '🕰️ • Utility',
        desc: 'See a user messages'
      },
      aliases: ['letra'],
      run: this.run
    }
  }

  async run (ctx) {
    if (!ctx.args[0]) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.say.noarg}`)
    const { get } = require('axios')
    await get(`https://lyrics-api.powercord.dev/lyrics?input=${encodeURI(ctx.args.join(' '))}`).then(response => {
      const musica = response.data.data[0]
      const embed = new global.star.manager.Ebl()
      embed.title(`Lyrics | ${global.star.user.username}`)
      embed.description(`${musica.lyrics}`)
      embed.color('#dd3af0')
      embed.thumbnail(global.star.user.avatarURL)
      ctx.send(embed.create)
    })
  }
}

// ADG, Davi e LRD
