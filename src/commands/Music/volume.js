module.exports = class PlayCommand {
  constructor () {
    return {
      permissoes: {
        membro: [],
        bot: ['embedLinks'],
        dono: false
      },
      pt: {
        nome: 'volume',
        categoria: '🎵 • Música',
        desc: 'Altera o volume da música'
      },
      en: {
        nome: 'volume',
        categoria: '🎵 • Music',
        desc: 'Change the music volume'
      },
      aliases: ['vol'],
      run: this.run
    }
  }

  async run (ctx) {
    const player = global.star.music.players.get(ctx.message.channel.guild.id)
    if (!ctx.message.member.voiceState) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.player.noc2}`)
    if (!player) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.player.not}`)

    if (!ctx.args[0]) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.vol.noarg}`)
    if (isNaN(ctx.args[0]) || ctx.args[0] < 0 || ctx.args[0] > 200) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.vol.noarg}`)
    player.setVolume(ctx.args[0])
    ctx.send(`✅ ${ctx.message.author.mention} **|** ${ctx.idioma.vol.v.replace('%v', ctx.args[0])}`)
  }
}
