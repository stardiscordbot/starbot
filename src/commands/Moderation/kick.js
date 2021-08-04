module.exports = class BanCommand {
  constructor () {
    return {
      permissoes: {
        membro: ['kickMembers'], // Permissoes que o usuario necessita
        bot: ['kickMembers'], // Permissoes que o bot necessita
        dono: false // Se apenas nos devs podem usar o comando
      },
      pt: {
        nome: 'kick',
        categoria: '🔨 • Moderação',
        desc: 'Bane algum usuário babaca de seu servidor.'
      },
      en: {
        nome: 'kick',
        categoria: '🔨 • Moderation',
        desc: 'Bane algum usuário babaca de seu servidor'
      },
      aliases: ['expulsar', 'hackkick', 'forcekick', 'kickar'],
      run: this.run
    }
  }

  async run (ctx) {
    let member
    if (!ctx.args[0]) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.ban.noarg}`)

    if (!ctx.message.mentions[0]) {
      member = await global.star.getRESTUser(ctx.args[0])
    } else {
      member = await ctx.message.mentions[0]
    }
    let banReason
    if (ctx.args[1]) {
      banReason = ctx.args.slice(1).join(' ')
    } else {
      banReason = ctx.idioma.ban.mot
    }
    ctx.message.channel.guild.kickMember(member.id, `${ctx.idioma.ban.mot2} ${ctx.message.author.tag} - ${ctx.idioma.ban.mot3} ${banReason}`).catch(err => {
      const embed = new global.star.manager.Ebl()
      embed.title(`${ctx.idioma.message.e}`)
      embed.description(`\`\`\`js\n${err}\n\`\`\``)
      embed.field(`${ctx.idioma.message.e2}`, `${ctx.idioma.message.e3}`)
      embed.color('#ff0000')
      embed.thumbnail(global.star.user.avatarURL)
      return ctx.send(embed.create)
    })
  }
}

// ADG, Davi e LRD
