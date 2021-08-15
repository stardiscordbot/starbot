module.exports = class BanCommand {
  constructor () {
    return {
      permissoes: {
        membro: ['banMembers'], // Permissoes que o usuario necessita
        bot: ['banMembers'], // Permissoes que o bot necessita
        dono: false // Se apenas nos devs podem usar o comando
      },
      pt: {
        nome: 'unbanall',
        categoria: '🔨 • Moderação',
        desc: 'Desbane todos os usuários babacas de seu servidor.'
      },
      en: {
        nome: 'unbanall',
        categoria: '🔨 • Moderation',
        desc: 'Unban all idiot user from your server'
      },
      aliases: ['desbanir', 'hackunban', 'forceunban'],
      run: this.run
    }
  }

  async run (ctx) {
    const bans = await global.star.getGuildBans(ctx.message.guild.id)
    ctx.message.channel.createMessage(`⏰ ${ctx.message.author.mention} **|** ${ctx.idioma.unbanall.des}`).then(message => {
      let banReason = ctx.args.splice(1).join(' ')
      if (!banReason) {
        banReason = `${ctx.idioma.ban.mot}`
      }

      const motivo = `${ctx.idioma.ban.mot2} ${ctx.message.author.username}#${ctx.message.author.discriminator} - ${ctx.idioma.ban.mot3} ${banReason}`
      bans.map(ban => ctx.message.channel.guild.unbanMember(ban.user.id, motivo))
      return message.edit(`✅ ${ctx.message.author.mention} **|** ${ctx.idioma.unbanall.done}`)
    })
  }
}
