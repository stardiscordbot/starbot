module.exports = class Idioma {
  constructor () {
    return {
      permissoes: {
        membro: ['manageGuild'],
        bot: []
      },
      pt: {
        nome: 'prefix',
        categoria: '⚙️ • Configuração',
        desc: 'Altera o idioma do bot.'
      },
      en: {
        nome: 'prefix',
        categoria: '⚙️ • Configuration',
        desc: 'Changes the bot language.'
      },
      aliases: ['pr', 'prefixo', 'setprefix', 'prefixamento', 'responder'],
      run: this.run
    }
  }

  async run (ctx) {
    if (!ctx.args[0]) return ctx.send(`:x: ${ctx.message.author.mention} **|** Informe o novo prefixo.`)
    global.db.set(`prefix-${ctx.message.guildID}`, ctx.args[0])
    ctx.send(`:white_check_mark: ${ctx.message.author.mention} **|** Prefixo alterado para: \`${ctx.args[0].replace(/`/g, '')}\``)
  }
}
