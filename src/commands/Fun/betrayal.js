module.exports = class PingCommand {
  constructor () {
    return {
      permissoes: {
        membro: [], // Permissoes que o usuario necessita
        bot: [], // Permissoes que o bot necessita
        dono: false // Se apenas nos devs podem usar o comando
      },
      pt: {
        nome: 'betrayal',
        categoria: '😄 • Diversão',
        desc: 'Jogue uma partida de batalha naval no discord'
      },
      en: {
        nome: 'betrayal',
        categoria: '😄 • Fun',
        desc: 'Play a game of betrayal in discord'
      },
      aliases: ['batalha', 'batalha-naval', 'battleroyale'],
      run: this.run
    }
  }

  async run (ctx) {
    if (!ctx.message.member.voiceState.channelID) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.player.noc2}`)
    global.star.discordTogether.createTogetherCode(ctx.message.member.voiceState.channelID, 'betrayal').then(async invite => {
      return ctx.message.channel.createMessage(`♟️ ${ctx.message.author.mention} **|** ${invite.code}`)
    })
  }
}

// ADG, Davi e LRD
