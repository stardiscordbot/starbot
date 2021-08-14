module.exports = class PlayCommand {
  constructor () {
    return {
      permissoes: {
        membro: [],
        bot: ['embedLinks'],
        dono: false
      },
      pt: {
        nome: 'play',
        categoria: '🎵 • Música',
        desc: 'Ouça músicas, yay'
      },
      en: {
        nome: 'play',
        categoria: '🎵 • Music',
        desc: 'Listen musics, yay'
      },
      aliases: ['p', 'tocar', 'som', 'somzao', 'somzão', 'dj'],
      run: this.run
    }
  }

  async run (ctx) {
    if (!ctx.args[0]) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.play.nada.replace('%p', ctx.prefix)}`)
    if (!ctx.message.member.voiceState.channelID) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.player.noc2}`)

    const res = await global.star.music.search(ctx.args.join(' '), ctx.message.author)

    const player = global.star.music.create({
      guild: ctx.message.channel.guild.id,
      voiceChannel: ctx.message.member.voiceState.channelID.channelID,
      textChannel: ctx.message.channel.id,
      selfDeafen: true
    })

    player.connect()
    player.queue.add(res.tracks[0])
    const track = res.tracks[0]

    if (!player.playing && !player.paused && !player.queue.size) {
      player.play()
    }
    if (!player.playing && !player.paused && player.queue.totalSize === res.tracks.length) {
      player.play()
    }
    const embed = new global.star.manager.Ebl()
    embed.title(`<:st_music_adicionado:830833070252097596> ${ctx.idioma.play.add}`)
    embed.description(`\`${track.title}: ${ctx.message.author.username}#${ctx.message.author.discriminator}\``)
    embed.thumbnail(global.star.user.avatarURL)
    embed.color('#dd3af0')
    ctx.send(embed.create)
  }
}

// ADG
