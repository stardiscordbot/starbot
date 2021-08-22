module.exports = class GiveawayEnd {
  constructor () {
    return {
      permissoes: {
        membro: ['manageGuild'], // Permissoes que o usuario necessita
        bot: ['embedLinks'], // Permissoes que o bot necessita
        dono: false // Se apenas nos devs podem usar o comando
      },
      pt: {
        nome: 'giveaway-end',
        categoria: '🎁 • Giveaway',
        desc: 'Colocou o tempo errado? Encerre o sorteio com esse comando :)'
      },
      en: {
        nome: 'giveaway-end',
        categoria: '🎁 • Giveaway',
        desc: 'Did you put the wrong time? End the giveaway with this command :)'
      },
      aliases: ['gend', 'gstop', 'sorteio-end', 'sorteio-encerrar'],
      run: this.run
    }
  }

  async run (ctx) {
    if (!ctx.args[0]) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.giveaway.end.replace('%p', ctx.prefix)}`)
    global.star.giveawaysManager.end(ctx.args[0])
  }
}
