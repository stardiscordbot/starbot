module.exports = class PlayCommand {
  constructor () {
    return {
      permissoes: {
        membro: [],
        bot: ['embedLinks'],
        dono: false
      },
      pt: {
        nome: 'nightcore',
        categoria: '🎵 • Música',
        desc: 'Ativa o filtro nightcore'
      },
      en: {
        nome: 'nightcore',
        categoria: '🎵 • Music',
        desc: 'Activates the nightcore filter'
      },
      aliases: ['night', 'nc'],
      run: this.run
    }
  }

  async run (ctx) {
    const player = await global.star.music.players.get(ctx.message.channel.guild.id)
    if (!ctx.message.member.voiceState.channelID) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.player.noc2}`)
    if (!player) {
      return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.player.not}`)
    } else {
      if (player.nightcore === false) {
        player.nightcore = true
        return ctx.send(`✅ ${ctx.message.author.mention} **|** ${ctx.idioma.filters.ativado}`)
      }
      if (player.nightcore === true) {
        player.nightcore = false
        return ctx.send(`✅ ${ctx.message.author.mention} **|** ${ctx.idioma.filters.desativado}`)
      }
    }
  }
}
