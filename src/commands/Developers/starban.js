module.exports = class EvalCommand {
  constructor () {
    return {
      permissoes: {
        membro: [],
        bot: [],
        dono: true
      },
      pt: {
        nome: 'starban',
        categoria: '💻 • Desenvolvedor',
        desc: 'Bane algum usuário babaca de utilizar a starbot (fiz isso pq ja estou de saco cheio)'
      },
      en: {
        nome: 'starban',
        categoria: '💻 • Developer',
        desc: 'Bans some idiot user from using the starbot (I did that because I\'m already fed up)'
      },
      aliases: ['botban', 'sb', 'proibir', 'addbl', 'blacklist'],
      run: this.run
    }
  }

  async run (ctx) {
    if (!ctx.args[0]) return ctx.send(`:x: ${ctx.message.author.mention} **|** Mencione algum usuário ou dê o id dele.`)
    const user = ctx.message.mentions[0] || await star.getRESTUser(ctx.args[0])
    if (!user) return ctx.send(`:x: ${ctx.message.author.mention} **|** Não encontrei o usuário.`)
    const motivo = ctx.args.slice(1).join(' ') || 'Not specified'

    if (user.id == '717766639260532826') return ctx.send(`:x: ${ctx.message.author.mention} **|** Você não pode banir....`)
    await global.db.set(`blacklist-${user.id}`, motivo)
    const embed = new global.star.manager.Ebl()
    embed.title(`🛠️ BotBan | ${star.user.username}`)
    embed.description(`O Usuário **${user.username}#${user.discriminator}** foi banido de me utilizar.`)
    embed.thumbnail(star.user.avatarURL)
    embed.color('#dd3af0')
    ctx.send(embed.create)
  }
}
