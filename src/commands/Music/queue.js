module.exports = class QueueCommand {
  constructor () {
    return {
      permissoes: {
        membro: [],
        bot: ['embedLinks'],
        dono: false
      },
      pt: {
        nome: 'queue',
        categoria: '🎵 • Música',
        desc: 'Mostra a fila de música'
      },
      en: {
        nome: 'queue',
        categoria: '🎵 • Music',
        desc: 'Shows the music queue'
      },
      aliases: ['fila', 'lista', 'playlist', 'np', 'nowplaying'],
      run: this.run
    }
  }

  async run (ctx) {
    const player = await global.star.music.players.get(ctx.message.channel.guild.id)
    if (!player) {
      const embed = new global.star.manager.Ebl()
      embed.title(`🎵 ${ctx.idioma.queue.t} • ${ctx.message.channel.guild.name}`)
      embed.description(ctx.idioma.queue.n)
      embed.thumbnail(global.star.user.avatarURL)
      embed.color('#dd3af0')
      return ctx.send(embed.create)
    } else {
      const embed = new global.star.manager.Ebl()
      embed.title(`🎵 ${ctx.idioma.queue.t} • ${ctx.message.channel.guild.name}`)
      embed.description(`${player.queue.map((track, i) => `**${i + 1}.** **[${track.title}](${track.uri})**\n`)}`)
      if (player.queue.current) {
        embed.field(ctx.idioma.erela.np.replace('🎵', '🎧').replace('!', ':'), `**[${player.queue.current.title}](${player.queue.current.uri})**`)
      }
      embed.color('#dd3af0')
      embed.thumbnail(global.star.user.avatarURL)
      ctx.send(embed.create)
    }
  }
}
