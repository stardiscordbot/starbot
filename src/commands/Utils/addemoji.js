module.exports = class AddemojiCommand {
  constructor () {
    return {
      permissoes: {
        membro: ['manageEmojis'], // Permissoes que o usuario necessita
        bot: ['manageEmojis'], // Permissoes que o bot necessita
        dono: false // Se apenas nos devs podem usar o comando
      },
      pt: {
        nome: 'addemoji',
        categoria: '🕰️ • Utilidades',
        desc: 'Mostra seu avatar ou o avatar de algum usuário.'
      },
      en: {
        nome: 'addemoji',
        categoria: '🕰️ • Utility',
        desc: 'Shows your avatar or a user\'s avatar.'
      },
      aliases: ['adicionaremoji'],
      run: this.run
    }
  }

  async run (ctx) {
    const { get } = require('axios')
    const url = ctx.args[1] ?? ctx.message.attachments[0]?.url
    const name = ctx.args[0]
    if (!name || !url) {
      ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.addemoji.args.replace('%p', ctx.prefix)}`)
    }
    try {
      const buffer = await get(url, { responseType: 'arraybuffer' }).then(d => Buffer.from(d.data, 'binary').toString('base64'))
      const base64Emoji = `data:image/${url.substr(url.length - 3)};base64,${buffer}`

      const emoji = await ctx.message.channel.guild.createEmoji({
        name: name,
        image: base64Emoji
      })

      const emoji2 = ctx.message.channel.guild.emojis.find(emoji => emoji.name.toLowerCase().includes(ctx.args[0].toLowerCase())) || ctx.message.channel.guild.emojis.find(emoji => emoji.id === ctx.args[0])
      const emo = {
        animated: emoji2.animated,
        name: emoji2.name,
        mention: `${emoji2.animated ? '<a:' : '<:'}${emoji.name}:${emoji.id}>`,
        id: emoji2.id,
        url: `https://cdn.discordapp.com/emojis/${emoji.id}.${emoji.animated ? 'gif' : 'png'}?v=1`
      }
      ctx.send(`${emo.mention} ${ctx.message.author.mention} **|** ${ctx.idioma.addemoji.add}`)
    } catch (e) {
      console.log(e)
      return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.addemoji.err}`)
    }
  }
}
