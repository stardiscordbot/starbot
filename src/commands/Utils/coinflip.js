module.exports = class CoinflipCommand {
  constructor () {
    return {
      permissoes: {
        membro: [], // Permissoes que o usuario necessita
        bot: [], // Permissoes que o bot necessita
        dono: false // Se apenas nos devs podem usar o comando
      },
      pt: {
        nome: 'coinflip',
        categoria: '🕰️ • Utilidades',
        desc: 'Mostra seu avatar ou o avatar de algum usuário.'
      },
      en: {
        nome: 'coinflip',
        categoria: '🕰️ • Utility',
        desc: 'Shows your avatar or a user\'s avatar.'
      },
      aliases: ['adicionaremoji'],
      run: this.run
    }
  }

  async run (ctx) {
    const number = Math.floor(Math.random() * 2)
    if (number === 1) return ctx.message.channel.createMessage(`<:st_cara:930504756911292466> ${ctx.message.author.mention} **|** **${ctx.idioma.coinflip.cara}**`)
    if (number === 0) return ctx.message.channel.createMessage(`<:st_coroa:930504645774815232> ${ctx.message.author.mention} **|** **${ctx.idioma.coinflip.coroa}**`)
  }
}
