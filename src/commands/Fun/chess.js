module.exports = class PingCommand {
  constructor () {
    return {
      permissoes: {
        membro: [], // Permissoes que o usuario necessita
        bot: [], // Permissoes que o bot necessita
        dono: false // Se apenas nos devs podem usar o comando
      },
      pt: {
        nome: 'chess',
        categoria: '😄 • Diversão',
        desc: 'Jogue uma partida de xadrez no discord'
      },
      en: {
        nome: 'chess',
        categoria: '😄 • Fun',
        desc: 'Play a game of chess in discord'
      },
      aliases: ['chessgame', 'xadrez'],
      run: this.run
    }
  }

  async run (ctx) {
    if (!ctx.message.member.voiceState.channelID) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.player.noc2}`)
    global.star.discordTogether.createTogetherCode(ctx.message.member.voiceState.channelID, 'chess').then(async invite => {
      return ctx.message.channel.createMessage(`♟️ ${ctx.message.author.mention} **|** ${invite.code}`)
    })
  }
}

// ADG, Davi e LRD
