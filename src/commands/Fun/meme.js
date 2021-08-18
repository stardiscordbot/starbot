module.exports = class MemeCommand {
  constructor () {
    return {
      permissoes: {
        membro: [], // Permissoes que o usuario necessita
        bot: [], // Permissoes que o bot necessita
        dono: false // Se apenas nos devs podem usar o comando
      },
      pt: {
        nome: 'meme',
        categoria: '😄 • Diversão',
        desc: 'Comando de Exemplo'
      },
      en: {
        nome: 'meme',
        categoria: '😄 • Fun',
        desc: 'Example Command'
      },
      aliases: ['memer', 'mem', 'dank', 'dankmemer'],
      run: this.run
    }
  }

  async run (ctx) {
    const { get } = require('axios')
    let link

    if (ctx.idioma.pdex.lang !== 'en') {
      link = 'https://www.reddit.com/r/MemesBrasil/random/.json'
    } else {
      link = 'https://www.reddit.com/r/memes/random/.json'
    }
    await get(link).then(response => {
      const res = response.data[0].data.children[0].data
      const embed = new global.star.manager.Ebl()
      embed.title(res.title)
      embed.url(`https://reddit.com${res.permalink}`)
      embed.image(res.url)
      embed.color('#dd3af0')
      embed.footer(`👍 ${res.ups} | 💬 ${res.num_comments}`)
      ctx.message.channel.createMessage(embed.create).then(msg => {
        msg.addReaction('👍')
        msg.addReaction('👎')
      })
    })
  }
}

// starbot 2020 ~ 2021
