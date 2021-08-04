module.exports = class PlayCommand {
  constructor () {
    return {
      permissoes: {
        membro: [],
        bot: [],
        dono: false
      },
      pt: {
        nome: 'bassboost',
        categoria: '🎵 • Música',
        desc: 'Ativa o filtro bassboost'
      },
      en: {
        nome: 'bassboost',
        categoria: '🎵 • Music',
        desc: 'Activates the bassboost filter'
      },
      aliases: ['bass', 'boost', 'bb', 'bass-boost'],
      run: this.run
    }
  }

  async run (ctx) {
    const player = await global.star.music.players.get(ctx.message.channel.guild.id)
    if (!ctx.message.member.voiceState) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.player.noc2}`)
    if (!player) {
      return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.player.not}`)
    } else {
      if (player.bassboost === false) {
        player.bassboost = true
        return ctx.send(`✅ ${ctx.message.author.mention} **|** ${ctx.idioma.filters}`)
      }
      if (player.bassboost === true) {
        player.bassboost = false
        return ctx.send(`✅ ${ctx.message.author.mention} **|** ${ctx.idioma.filters}`)
      }
    }
  }
}
