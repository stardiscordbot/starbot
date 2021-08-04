module.exports = class MagicBallCommand {
  constructor () {
    return {
      permissoes: {
        membro: [], // Permissoes que o usuario necessita
        bot: ['attachFiles'], // Permissoes que o bot necessita
        dono: false // Se apenas nos devs podem usar o comando
      },
      pt: {
        nome: 'magicball',
        categoria: '😄 • Diversão',
        desc: 'Bola magica'
      },
      en: {
        nome: 'magicball',
        categoria: '😄 • Fun',
        desc: 'Magic ball'
      },
      aliases: ['8ball', 'eightball', 'crystal', 'mb', '8b', 'crystalball', 'eight_ball', 'eight-ball', 'crystal-ball', 'bola-de-cristal', 'bola_de_cristal', 'boladecristal', 'crystal_ball'],
      run: this.run
    }
  }

  async run (ctx) {
    const respostas = {}
    respostas.pt = [
      'sim',
      'não',
      'talvez',
      'provavelmente',
      'com certeza',
      'boa sorte',
      'não me pergunte isso'
    ]
    respostas.en = [
      'yea',
      'no',
      'perhaps',
      'probably',
      'certainly',
      'good luck',
      'don\'t ask me that'
    ]
    const pt = respostas.pt[Math.floor(Math.random() * respostas.pt.length)]
    const en = respostas.en[Math.floor(Math.random() * respostas.en.length)]

    const pergunta = ctx.args.join(' ').toLowerCase()

    const embed = new global.star.manager.Ebl()
    embed.title(`🔮 ${ctx.idioma.b.title}`)
    embed.field(`🤔 ${ctx.idioma.b.per}`, pergunta)

    if (ctx.idioma.b.id === 'pt') {
      embed.field(`📝 ${ctx.idioma.b.res}`, pt)
    } else {
      embed.field(`📝 ${ctx.idioma.b.res}`, en)
    }

    embed.thumbnail(global.star.user.avatarURL)
    embed.color('#dd3af0')
    ctx.send(embed.create)
  }
}

// ADG, Davi e LRD
