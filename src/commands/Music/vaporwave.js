module.exports = class PlayCommand {
  constructor () {
    return {
      permissoes: {
        membro: [],
        bot: ['embedLinks'],
        dono: false
      },
      pt: {
        nome: 'vaporwave',
        categoria: '🎵 • Música',
        desc: 'Ativa o filtro vaporwave'
      },
      en: {
        nome: 'vaporwave',
        categoria: '🎵 • Music',
        desc: 'Activates the vaporwave filter'
      },
      aliases: ['vapor', 'vp', 'wave', 'vapor-wave', 'vaporonda'],
      run: this.run
    }
  }

  async run (ctx) {
    const player = await global.star.music.players.get(ctx.message.channel.guild.id)
    if (!ctx.message.member.voiceState) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.player.noc2}`)
    if (!player) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.player.not}`)
    if (player.vaporwave === false) {
      player.vaporwave = true
      return ctx.send(`✅ ${ctx.message.author.mention} **|** ${ctx.idioma.filters.ativado}`)
    }
    if (player.vaporwave === true) {
      player.vaporwave = false
      return ctx.send(`✅ ${ctx.message.author.mention} **|** ${ctx.idioma.filters.desativado}`)
    }
  }
}
