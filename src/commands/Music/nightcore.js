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
    if (!ctx.message.member.voiceState) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.player.noc2}`)
    if (!player) {
      return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.player.not}`)
    } else {
      if (player.nightcore === false) {
        await global.star.music.players.get(ctx.message.channel.guild.id).setNightcore(true)
        return ctx.send(`✅ ${ctx.message.author.mention} **|** ${ctx.idioma.filters.ativado.replace('%f', 'nightcore')}`)
      }
      if (player.nightcore === true) {
        await global.star.music.players.get(ctx.message.channel.guild.id).setNightcore(false)
        return ctx.send(`✅ ${ctx.message.author.mention} **|** ${ctx.idioma.filters.desativado.replace('%f', 'nightcore')}`)
      }
    }
  }
}
