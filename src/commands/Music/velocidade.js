module.exports = class PlayCommand {
  constructor () {
    return {
      permissoes: {
        membro: [],
        bot: ['embedLinks'],
        dono: false
      },
      pt: {
        nome: 'velocity',
        categoria: '🎵 • Música',
        desc: 'Altera a velocidade da música.'
      },
      en: {
        nome: 'velocity',
        categoria: '🎵 • Music',
        desc: 'Change the music speed.'
      },
      aliases: ['vel', 'velocidade'],
      run: this.run
    }
  }

  async run (ctx) {
    const player = await global.star.music.players.get(ctx.message.channel.guild.id)
    if (!ctx.message.member.voiceState) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.player.noc2}`)
    if (!player) {
      return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.player.not}`)
    } else {
      const velocidade = ctx.args[0].replace('%', '')
      if (isNaN(velocidade) || velocidade < 0 || velocidade > 5) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.vol.noarg.replace('200', '5')}`)
      player.setSpeed(velocidade)
      return ctx.send(`✅ ${ctx.message.author.mention} **|** ${ctx.idioma.vel.v.replace('%v', velocidade)}`)
    }
  }
}
