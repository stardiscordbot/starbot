module.exports = class HugCommand {
  constructor () {
    return {
      permissoes: {
        membro: [], // Permissoes que o usuario necessita
        bot: ['embedLinks'], // Permissoes que o bot necessita
        dono: false // Se apenas nos devs podem usar o comando
      },
      pt: {
        nome: 'kiss',
        categoria: '😄 • Diversão',
        desc: 'Beije seu amigo'
      },
      en: {
        nome: 'kiss',
        categoria: '😄 • Fun',
        desc: 'Kiss your friend'
      },
      aliases: ['beijar', 'beijo', 'b', 'beijinho', 'kis'],
      run: this.run
    }
  }

  async run (ctx) {
    if (!ctx.args[0]) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.hug.user}`)
    const user = ctx.message.mentions[0] || await global.star.getRESTUser(ctx.args[0]).catch((e) => {
      return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.hug.user}`)
    })
    const fetch = require('star-fetch')
    const res = fetch('https://nekos.life/api/v2/img/kiss')
    const ReactionCollector = require('../../Helpers/ReactionCollector')
    const embed = new global.star.manager.Ebl()
    embed.description(`👩‍❤️‍💋‍👨 **${ctx.message.author.username}** ${ctx.idioma.hug.acaba.replace('acaba de abraçar', 'beijou').replace('just hugging', 'kissed')} **${user.username}**.`)
    embed.image(res.url)
    embed.color('#dd3af0')
    ctx.message.channel.createMessage(embed.create).then(msg => {
      msg.addReaction('🔁')
      const c = new ReactionCollector(msg, {
        user: user,
        ignoreBot: true,
        emoji: '🔁',
        time: 90000,
        max: 10,
        acceptReactionRemove: false,
        stopOnCollect: true
      })
      c.on('collect', (message, emoji) => {
        const res = fetch('https://nekos.life/api/v2/img/kiss')
        const embed = new global.star.manager.Ebl()
        embed.description(`👩‍❤️‍💋‍👨 **${user.username}** ${ctx.idioma.hug.acaba.replace('acaba de abraçar', 'beijou').replace('just hugging', 'kissed')} **${ctx.message.author.username}**.`)
        embed.image(res.url)
        embed.color('#dd3af0')
        message.channel.createMessage(embed.create)
      })
    })
  }
}
