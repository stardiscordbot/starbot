module.exports = class InviteCommand {
  constructor () {
    return {
      permissoes: {
        membro: [], // Permissoes que o usuario necessita
        bot: ['embedLinks'], // Permissoes que o bot necessita
        dono: false // Se apenas nos devs podem usar o comando
      },
      pt: {
        nome: 'invite',
        categoria: '🕰️ • Utilidades',
        desc: 'Envia o link para me adicionar a outros servidores'
      },
      en: {
        nome: 'invite',
        categoria: '🕰️ • Utility',
        desc: 'Send the link to add me to other servers'
      },
      aliases: ['convidar', 'convidarbot', 'invitebot', 'convite'],
      run: this.run
    }
  }

  async run (ctx) {
    const embed = new global.star.manager.Ebl()
    embed.title(`📩 ${ctx.idioma.invite.add}`)
    embed.description(ctx.idioma.invite.desc)
    embed.color('#dd3af0')
    embed.thumbnail(global.star.user.avatarURL)
    ctx.send(embed.create)
  }
}

// ADG, Davi e LRD
