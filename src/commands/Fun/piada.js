module.exports = class JokeCommand {
  constructor () {
    return {
      permissoes: {
        membro: [], // Permissoes que o usuario necessita
        bot: ['embedLinks'], // Permissoes que o bot necessita
        dono: false // Se apenas nos devs podem usar o comando
      },
      pt: {
        nome: 'piada',
        categoria: '😄 • Diversão',
        desc: 'Conta uma piada'
      },
      en: {
        nome: 'piada',
        categoria: '😄 • Fun',
        desc: 'Tell a joke'
      },
      aliases: ['jokes', 'joke'],
      run: this.run
    }
  }

  async run (ctx) {
    const { get } = require('axios')
    await get('https://www.adgdeveloper.tk/api/jokes').then(response => {
      const piada = response.data
      ctx.send(`❓ **-** ${ctx.message.author.mention} ${piada.pergunta}\n🤣 **-** ${piada.resposta}`)
    })
  }
}
