module.exports = class AvatarCommand {
    constructor(){
      return {
        permissoes: {
          membro: [], //Permissoes que o usuario necessita
          bot: ['embedLinks'], //Permissoes que o bot necessita
          dono: false //Se apenas nos devs podem usar o comando
        },
        pt: {
          nome: 'afk',
          categoria: '🕰️ • Utilidades' ,
          desc: 'Use quando você estiver longe do teclado, quando você para participar de uma discussão em uma sala de bate-papo por um curto período, avise a seus amigos com esse comando ^-^'
        },
        en: {
          nome: 'afk',
          categoria: '🕰️ • Utility',
          desc: 'Use when you are away from the keyboard, when you want to join a discussion in a chat room for a short time, let your friends know with this command ^-^'
        },
      aliases: ['awayfromthekeyboard'],
      run: this.run
      }
    }
    
    async run(ctx) {
        const afk = await db.get(`afk-${ctx.message.author.id}`)
        if(!afk) {
            db.set(`afk-${ctx.message.author.id}`, `${ctx.args.join(" ") || "Não Definido"}`)
            ctx.message.member.setNickname(`AFK ${ctx.message.member.nickname || ctx.message.author.username}`)
            ctx.send(`💤 ${ctx.message.author.mention} **|** ${ctx.idioma.afk.set} \`${ctx.args.join(" ").replace(/`/g, '') || "Não Definido"}\``)
        } else {
            db.del(`afk-${ctx.message.author.id}`)
            ctx.message.member.setNickname(`${ctx.message.member.nickname.replace(/AFK/g, "") || ctx.message.author.username}`)
            ctx.send(`💤 ${ctx.message.author.mention} **|** ${ctx.idioma.afk.wel}`)
        }
  }
}