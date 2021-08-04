module.exports = class PlayCommand {
  constructor () {
    return {
      permissoes: {
        membro: [],
        bot: ['embedLinks'],
        dono: false
      },
      pt: {
        nome: 'loop',
        categoria: '🎵 • Música',
        desc: 'Ativa o loop'
      },
      en: {
        nome: 'loop',
        categoria: '🎵 • Music',
        desc: 'Activates the loop'
      },
      aliases: ['repeat', 'l', 'ciclo', 'repetir'],
      run: this.run
    }
  }

  async run (ctx) {
    const player = await global.star.music.players.get(ctx.message.channel.guild.id)
    if (!player) {
      return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.player.not}`)
    } else {
      if (player.trackRepeat === false) {
        player.setTrackRepeat(true)
        return ctx.send(`✅ ${ctx.message.author.mention} **|** ${ctx.idioma.loop.ativado}`)
      }
      if (player.trackRepeat === true) {
        player.setTrackRepeat(false)
        return ctx.send(`✅ ${ctx.message.author.mention} **|** ${ctx.idioma.loop.desativado}`)
      }
    }
  }
}
