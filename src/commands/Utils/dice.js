module.exports = class CotacaoCommand {
  constructor () {
    return {
      permissoes: {
        membro: [], // Permissoes que o usuario necessita
        bot: ['embedLinks'], // Permissoes que o bot necessita
        dono: false // Se apenas nos devs podem usar o comando
      },
      pt: {
        nome: 'dice',
        categoria: '🕰️ • Utilidades',
        desc: 'Rola um dado e fala o resultado dele.'
      },
      en: {
        nome: 'dice',
        categoria: '🕰️ • Utility',
        desc: 'Roll a die and say the result.'
      },
      aliases: ['dado', 'roll', 'rolar'],
      run: this.run
    }
  }

  async run (ctx) {
    let number
    if (!ctx.args[0]) {
      number = 6
    } else {
      number = Number(ctx.args[0])
    }
    const numero = Math.floor(Math.random() * number) + 1

    ctx.send(`🎲 ${ctx.message.author.mention} **|** ${ctx.idioma.dice.p1} **${number}** ${ctx.idioma.dice.p2} **${numero}**`)
  }
}
