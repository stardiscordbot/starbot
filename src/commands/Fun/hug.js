module.exports = class HugCommand {
  constructor () {
    return {
      permissoes: {
        membro: [], // Permissoes que o usuario necessita
        bot: ['embedLinks'], // Permissoes que o bot necessita
        dono: false // Se apenas nos devs podem usar o comando
      },
      pt: {
        nome: 'hug',
        categoria: '😄 • Diversão',
        desc: 'Abrace seu amigo'
      },
      en: {
        nome: 'hug',
        categoria: '😄 • Fun',
        desc: 'Hug your friend'
      },
      aliases: ['abraçar', 'abraço', 'abracar', 'abraco'],
      run: this.run
    }
  }

  async run (ctx) {
    if (!ctx.args[0]) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.hug.user}`)
    const user = ctx.message.mentions[0] || await global.star.getRESTUser(ctx.args[0]).catch((e) => {
      return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.hug.user}`)
    })
    const { get } = require('axios')
    await get('https://nekos.life/api/v2/img/hug').then(response => {
      const res = response.data
      const ReactionCollector = require('../../Helpers/ReactionCollector')
      const embed = new global.star.manager.Ebl()
      embed.description(`🫂 **${ctx.message.author.username}** ${ctx.idioma.hug.acaba} **${user.username}**.`)
      embed.image(res.url)
      embed.color('#dd3af0')
      // embed.footer(ctx.idioma.hug.r)
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
        c.on('collect', async (message, emoji) => {
          await get('https://nekos.life/api/v2/img/hug').then(response2 => {
            const res = response2.data
            const embed = new global.star.manager.Ebl()
            embed.description(`🫂 **${user.username}** ${ctx.idioma.hug.acaba} **${ctx.message.author.username}**.`)
            embed.image(res.url)
            embed.color('#dd3af0')
            message.channel.createMessage(embed.create)
          })
        })
      })
    })
  }
}
