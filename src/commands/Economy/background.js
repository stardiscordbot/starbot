module.exports = class EvalCommand {
  constructor () {
    return {
      permissoes: {
        membro: [],
        bot: ['embedLinks'],
        dono: false
      },
      pt: {
        nome: 'background',
        categoria: '💸 • Economia',
        desc: 'Comando para comprar Planos de Fundo para o seu perfil.'
      },
      en: {
        nome: 'background',
        categoria: '💸 • Economy',
        desc: 'Command to buy Backgrounds for your profile.'
      },
      aliases: ['back'],
      run: this.run
    }
  }

  async run (ctx) {
    const ReactionCollector = require('../../Helpers/ReactionCollector')
    const background = require('../../backgrounds')
    const rand = Math.floor(Math.random() * background.backgrounds.length)
    const tema = background.backgrounds[rand]

    const embed = new global.star.manager.Ebl()
    embed.description(ctx.idioma.perfil.comp + ` ** | ⭐ ${tema.value}**`)
    embed.image(tema.url)
    embed.color('#dd3af0')
    ctx.message.channel.createMessage(embed.create).then(async message => {
      message.addReaction('🛒')
      const BuyCollector = new ReactionCollector(message, {
        user: ctx.message.author,
        ignoreBot: true,
        emoji: '🛒',
        time: 60000,
        max: 1,
        acceptReactionRemove: false,
        stopOnCollect: true
      })

      BuyCollector.on('collect', async (msg) => {
        const money = await global.db.get(`money-${ctx.message.author.id}`)

        if (!money) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.perfil.no}`)
        if (Number(money) < Number(tema.value)) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.perfil.no}`)
        await global.db.set(`background-${ctx.message.author.id}`, tema.url)
        ctx.send(`:white_check_mark: ${ctx.message.author.mention} **|** ${ctx.idioma.perfil.succ}`)
        message.delete()
      })
    })
  }
}
