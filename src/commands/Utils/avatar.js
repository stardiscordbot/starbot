module.exports = class AvatarCommand {
    constructor(){
      return {
        permissoes: {
          membro: [], //Permissoes que o usuario necessita
          bot: ['embedLinks'], //Permissoes que o bot necessita
          dono: false //Se apenas nos devs podem usar o comando
        },
        pt: {
          nome: 'avatar',
          categoria: '🕰️ • Utilidades' ,
          desc: 'Mostra seu avatar ou o avatar de algum usuário.'
        },
        en: {
          nome: 'avatar',
          categoria: '🕰️ • Utility',
          desc: 'Shows your avatar or a user\'s avatar.'
        },
      aliases: ['photo', 'av', 'picture', 'foto'],
      run: this.run
      }
    }
    
    async run(ctx) {
      try {
      const user = ctx.args[0] ? ctx.message.mentions[0] || await star.getRESTUser(ctx.args[0]) : ctx.message.author
      const embed = new star.manager.ebl;
      embed.title(`${ctx.idioma.avatar.from} ${user.username}#${user.discriminator}`)
      embed.image(user.avatarURL)
      embed.color('#dd3af0')
      return ctx.send(embed.create)
      } catch {
        return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.avatar.unknown}`)
      }
    
  }
  }
  
