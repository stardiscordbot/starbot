module.exports = class Nitro {
  constructor () {
    return {
      permissoes: {
        membro: [], // Permissoes que o usuario necessita
        bot: ['attachFiles'], // Permissoes que o bot necessita
        dono: false // Se apenas nos devs podem usar o comando
      },
      pt: {
        nome: 'nitro',
        categoria: '😄 • Diversão',
        desc: 'Cria uma conquista do minecraft'
      },
      en: {
        nome: 'nitro',
        categoria: '😄 • Fun',
        desc: 'Create a minecraft achievement'
      },
      aliases: ['fakenitro', 'fake-nitro', 'nitrofake', 'gift', 'giftnitro', 'nitrogift'],
      run: this.run
    }
  }

  async run (ctx) {
    const { readFile } = require('fs')
    const util = require('util')
    const read = util.promisify(readFile)
    ctx.message.channel.createMessage(`<:ES_panda:815580024811814913> ${ctx.message.author.mention} **|** 𝖽iscord.gift/${Math.random().toString(36).slice(-8)}`, {
      file: await read('./assets/nitro2.png'),
      name: 'nitro.png'
    })
  }
}
