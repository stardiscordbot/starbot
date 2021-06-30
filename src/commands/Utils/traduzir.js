module.exports = class InfoCommand {
  constructor() {
    return {
      permissoes: {
        membro: [], // Permissoes que o usuario necessita
        bot: [], // Permissoes que o bot necessita
        dono: false // Se apenas nos devs podem usar o comando
      },
      pt: {
        nome: 'tradutor',
        categoria: '🪓 • Util',
        desc: 'Traduza frases e palavras usando esse comando'
      },
      en: {
        nome: 'translator',
        categoria: '🪓 • Util',
        desc: 'Translate phrases and words using this command'
      },
      aliases: ['translator', 'traduzir'],
      run: this.run
    }
  }

  async run(ctx) {
    const fetch = require('star-fetch')
    if (!ctx.args[0]) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.tradutor.text.replace('%', ctx.prefix)}`)
    if (ctx.args[1] === undefined) {
      return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.tradutor.text.replace('%', ctx.prefix)}`)
    }
    // eslint-disable-next-line no-useless-escape
    const regex = /[!*();,:@&=+$.\/?%#[\]]/g
    const lang = ctx.args[0]
    const msg = ctx.args.slice(1).join(' ').replace(regex, '')
    const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${lang}&dt=t&ie=UTF-8&oe=UTF-8&q=${encodeURI(msg)}`)
    const body = res[0][0][0]
    const trans = body
    ctx.send(`🌎 ${ctx.message.author.mention} **|** ` + '`' + trans.replace(/`/g, '').replace(/@/g, '') + '`')
  }
}
