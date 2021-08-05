module.exports = class Idioma {
  constructor () {
    return {
      permissoes: {
        membro: ['manageGuild'],
        bot: []
      },
      pt: {
        nome: 'antiinvite',
        categoria: '⚙️ • Configuração',
        desc: 'O AntiInvite irá impedir que membros enviem convites em seu servidor.'
      },
      en: {
        nome: 'antiinvite',
        categoria: '⚙️ • Configuration',
        desc: 'AntiInvite will prevent members from sending invites on your server.'
      },
      aliases: ['anti-invite', 'anticonvite', 'anti-convite'],
      run: this.run
    }
  }

  async run (ctx) {
    const anitlink = global.db.get(`antiinvite-${ctx.message.channel.guild.id}`)
    if (anitlink === true) {
      global.db.set(`antiinvite-${ctx.message.channel.guild.id}`, false)
      return ctx.send(`:x: ${ctx.message.author.mention} **|** AntiInvite desativado com sucesso.`)
    } else {
      global.db.set(`antiinvite-${ctx.message.channel.guild.id}`, true)
      return ctx.send(`:x: ${ctx.message.author.mention} **|** AntiInvite ativado com sucesso.`)
    }
  }
}
