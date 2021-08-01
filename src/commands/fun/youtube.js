module.exports = class PingCommand {
  constructor () {
    return {
      permissoes: {
        membro: [], // Permissoes que o usuario necessita
        bot: [], // Permissoes que o bot necessita
        dono: false // Se apenas nos devs podem usar o comando
      },
      pt: {
        nome: 'youtube',
        categoria: '🕰️ • Utilidades',
        desc: 'Assista youtube no discord'
      },
      en: {
        nome: 'youtube',
        categoria: '🕰️ • Utility',
        desc: 'Watch youtube on discord'
      },
      aliases: ['youtubetogether', 'youtube-together'],
      run: this.run
    }
  }

  async run (ctx) {
    if (!ctx.message.member.voiceState) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.player.noc2}`)
    global.star.discordTogether.createTogetherCode(ctx.message.member.voiceState.channelID, 'youtube').then(async invite => {
      return ctx.message.channel.createMessage(`🎥 ${ctx.message.author.mention} **|** ${invite.code}`)
    })
  }
}

// ADG, Davi e LRD
