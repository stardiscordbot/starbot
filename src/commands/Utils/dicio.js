module.exports = class AvatarCommand {
  constructor () {
    return {
      permissoes: {
        membro: [], // Permissoes que o usuario necessita
        bot: ['embedLinks'], // Permissoes que o bot necessita
        dono: false // Se apenas nos devs podem usar o comando
      },
      pt: {
        nome: 'dicio',
        categoria: '🕰️ • Utilidades',
        desc: 'Procure o significado de uma palavra no dicionário!'
      },
      en: {
        nome: 'dicio',
        categoria: '🕰️ • Utility',
        desc: 'Look up the meaning of a word in the dictionary!'
      },
      aliases: ['dicionário', 'dicionario', 'definir'],
      run: this.run
    }
  }

  async run (ctx) {
    if (!ctx.args[0]) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.mal.term}`)
    const { get } = require('axios')
    await get(`https://significado.herokuapp.com/meanings/${encodeURI(ctx.args.join(' '))}`).then(response => {
      console.log(response)

      const palavra = response.data[0]
      const embed = new global.star.manager.Ebl()
      embed.title(`📚 ${ctx.idioma.dicio.title} | ${global.star.user.username}`)
      embed.field(`📝 ${ctx.idioma.dicio.c}`, palavra.class)
      embed.field(`💖 ${ctx.idioma.dicio.meanings}`, palavra.meanings.join('\n'))
      embed.thumbnail(global.star.user.avatarURL)
      embed.color('#dd3af0')
      ctx.send(embed.create)
    })
  }
}
