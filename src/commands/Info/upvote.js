module.exports = class PingCommand {
  constructor () {
    return {
      permissoes: {
        membro: [], // Permissoes que o usuario necessita
        bot: ['embedLinks'], // Permissoes que o bot necessita
        dono: true // Se apenas nos devs podem usar o comando
      },
      pt: {
        nome: 'vote',
        categoria: '📖 • Informação',
        desc: 'Mostra informações do bot'
      },
      en: {
        nome: 'vote',
        categoria: '📖 • Information',
        desc: 'Show botinfo'
      },
      aliases: ['upvote', 'downvote', 'rep', 'ajudar'],
      run: this.run
    }
  }

  async run (ctx) {
    const embed = new global.star.manager.Ebl()
    embed.title(`<:st_botlist_upvoted:831132651930910760> Upvote | ${global.star.user.username}`)
    embed.description('<:st_botlist_topgg:836183481432276993> [top.gg](https://top.gg/bot/719524114536333342/vote)\n<:st_botlist_infinity:836183552999030815> [infinitybotlist.com](https://infinitybotlist.com/bots/719524114536333342/vote)\n<:st_listcord:845723224397709332> [listcord.gg](https://listcord.gg/x/star)\n<:st_bestlist:851868925109338122> [bestlist.online](https://bestlist.online/vote/719524114536333342)')
    embed.color('#dd3af0')
    embed.thumbnail(global.star.user.avatarURL)
    ctx.send(embed.create)
  }
}

// ADG, Davi e LRD
