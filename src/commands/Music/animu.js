module.exports = class AnimuCommand {
  constructor () {
    return {
      permissoes: {
        membro: [],
        bot: [],
        dono: false
      },
      pt: {
        nome: 'animu',
        categoria: '🎵 • Música',
        desc: 'Ativa o filtro 8D'
      },
      en: {
        nome: 'animu',
        categoria: '🎵 • Music',
        desc: 'Activates the 8D filter'
      },
      aliases: ['radio'],
      run: this.run
    }
  }

  async run (ctx) {
    const play = global.star.music.players.get(ctx.message.channel.guild.id)
    if (!ctx.message.member.voiceState.channelID) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.player.noc2}`)

    if (!play) {
      const player = global.star.music.create({
        guild: ctx.message.channel.guild.id,
        voiceChannel: ctx.message.member.voiceState.channelID,
        textChannel: ctx.message.channel.id,
        selfDeafen: true
      })
      await player.connect()
    }

    const player = global.star.music.players.get(ctx.message.channel.guild.id)
    const res = await player.search('https://cast.animu.com.br:9006/stream', ctx.message.author)
    if (res.loadType === 'LOAD_FAILED') {
      if (!player.queue.current) player.destroy()
      throw new Error(res.exception.message)
    }

    player.set('interaction', undefined)
    player.queue.add(res.tracks[0])
    if (!player.playing && !player.paused && !player.queue.size) player.play()
    if (player.queue.size >= 1) {
      const embed = new global.star.manager.Ebl()
      embed.title(`<:st_music_adicionado:830833070252097596> ${ctx.idioma.play.add}`)
      embed.description(`\`Animu: ${ctx.message.author.username}#${ctx.message.author.discriminator}\``)
      embed.thumbnail(global.star.user.avatarURL)
      embed.color('#dd3af0')
      await ctx.send(embed.create) // ctx.send
    }
  }
}
