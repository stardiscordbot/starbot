module.exports = class CotacaoCommand {
  constructor () {
    return {
      permissoes: {
        membro: [], // Permissoes que o usuario necessita
        bot: ['embedLinks'], // Permissoes que o bot necessita
        dono: false // Se apenas nos devs podem usar o comando
      },
      pt: {
        nome: 'cotacao',
        categoria: '🕰️ • Utilidades',
        desc: 'Acompanhe a cotação das moedas'
      },
      en: {
        nome: 'currencies',
        categoria: '🕰️ • Utility',
        desc: 'Track the quote of currencies'
      },
      aliases: ['corretora', 'cambio', 'cotação', 'câmbio', 'dolar', 'real', 'bitcoin'],
      run: this.run
    }
  }

  async run (ctx) {
    const { get } = require('axios')
    await get('https://economia.awesomeapi.com.br/json/all/USD-BRL,EUR-BRL,BTC-BRL,CAD-BRL').then(response => {
      const res = response.data
      const embed = new global.star.manager.Ebl()
      embed.title(`💸 ${ctx.idioma.cotacao.t}`)
      embed.field(`🇺🇸 ${ctx.idioma.cotacao.f1}`, `R$ ${res.USD.bid}`, true)
      embed.field(`🇪🇺 ${ctx.idioma.cotacao.f2}`, `R$ ${res.EUR.bid}`, true)
      embed.field(`💰 ${ctx.idioma.cotacao.f3}`, `R$ ${res.CAD.bid}`, true)
      embed.color('#dd3af0')
      ctx.send(embed.create)
    })
  }
}
