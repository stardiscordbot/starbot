module.exports = class DistorCommand {
  constructor () {
    return {
      permissoes: {
        membro: [],
        bot: [],
        dono: false
      },
      pt: {
        nome: 'distortion',
        categoria: '🎵 • Música',
        desc: 'Ativa o filtro distorcido'
      },
      en: {
        nome: 'distortion',
        categoria: '🎵 • Music',
        desc: 'Activates the distortion filter'
      },
      aliases: ['distor', 'distorção', 'distorcao'],
      run: this.run
    }
  }

  async run (ctx) {
    const player = await global.star.music.players.get(ctx.message.channel.guild.id)
    if (!ctx.message.member.voiceState) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.player.noc2}`)
    if (!player) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.player.not}`)
    if (player.distortion === false) {
      await global.star.music.players.get(ctx.message.channel.guild.id).setDistortion(true)
      return ctx.send(`✅ ${ctx.message.author.mention} **|** ${ctx.idioma.filters.ativado.replace('%f', 'distortion')}`)
    }
    if (player.distortion === true) {
      await global.star.music.players.get(ctx.message.channel.guild.id).setDistortion(false)
      return ctx.send(`✅ ${ctx.message.author.mention} **|** ${ctx.idioma.filters.desativado.replace('%f', 'distortion')}`)
    }
  }
}
