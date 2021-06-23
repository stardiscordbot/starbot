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
    const player = await star.music.players.get(ctx.message.channel.guild.id)
    if (!ctx.message.member.voiceState) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.player.noc2}`)
    if (!player) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.player.not}`)
    if (player._8d == false) {
      await star.music.players.get(ctx.message.channel.guild.id).set8D(true)
      return ctx.send(`✅ ${ctx.message.author.mention} **|** ${ctx.idioma.filters.ativado.replace('%f', '8D')}`)
    }
    if (player._8d == true) {
      await star.music.players.get(ctx.message.channel.guild.id).set8D(false)
      return ctx.send(`✅ ${ctx.message.author.mention} **|** ${ctx.idioma.filters.desativado.replace('%f', '8D')}`)
    }
  }
}
