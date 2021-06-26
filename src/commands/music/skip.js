module.exports = class SkipCommand {
  constructor () {
    return {
      permissoes: {
        membro: [],
        bot: ['embedLinks'],
        dono: false
      },
      pt: {
        nome: 'skip',
        categoria: '🎵 • Música',
        desc: 'Pula para a proxima música'
      },
      en: {
        nome: 'skip',
        categoria: '🎵 • Music',
        desc: 'Skip to the next song'
      },
      aliases: ['next', 'pular', 'jump', 'proxima', 'nextmus', 'nextmusc', 'nextmusic', 'proximamusica', 'proxima-musica'],
      run: this.run
    }
  }

  async run (ctx) {
    const player = global.star.music.players.get(ctx.message.channel.guild.id)
    if (!player) {
      return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.player.not}`)
    } else {
      player.stop()
      return ctx.message.addReaction('✅')
    }
  }
}
