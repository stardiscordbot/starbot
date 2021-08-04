module.exports = class PlayCommand {
  constructor () {
    return {
      permissoes: {
        membro: [],
        bot: ['embedLinks'],
        dono: false
      },
      pt: {
        nome: '8d',
        categoria: '🎵 • Música',
        desc: 'Ativa o filtro 8D'
      },
      en: {
        nome: '8d',
        categoria: '🎵 • Music',
        desc: 'Activates the 8D filter'
      },
      aliases: ['fone', '8'],
      run: this.run
    }
  }

  async run (ctx) {
    const player = await global.star.music.players.get(ctx.message.channel.guild.id)
    if (!ctx.message.member.voiceState) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.player.noc2}`)
    if (!player) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.player.not}`)
    if (player._8d === false) {
      player.eightD = true
      return ctx.send(`✅ ${ctx.message.author.mention} **|** ${ctx.idioma.filters.ativado}`)
    }
    if (player._8d === true) {
      player.eightD = false
      return ctx.send(`✅ ${ctx.message.author.mention} **|** ${ctx.idioma.filters.desativado}`)
    }
  }
}
