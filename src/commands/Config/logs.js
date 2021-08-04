module.exports = class EventlogCommand {
  constructor () {
    return {
      permissoes: {
        membro: ['manageGuild'], // Permissoes que o usuario necessita
        bot: [], // Permissoes que o bot necessita
        dono: true // Se apenas nos devs podem usar o comando
      },
      pt: {
        nome: 'logs',
        categoria: '⚙️ • Configuração',
        desc: 'Define um canal para receber as logs do servidor.'
      },
      en: {
        nome: 'logs',
        categoria: '⚙️ • Configuration',
        desc: 'Set a channel to receive the server logs.'
      },
      aliases: ['serverlogs', 'messagelog', 'meblogs', 'guildlogs', 'eventlog'],
      run: this.run
    }
  }

  async run (ctx) {
    if (!ctx.args[0]) {
      return ctx.send(
            `:x: ${ctx.message.author.mention} **|** ${ctx.idioma.guildLogs.insertChannel.replace(
                '%p',
                ctx.prefix
            )}`
      )
    }

    if (
      ctx.args[0] &&
(ctx.args[0].toLowerCase() === 'desativar' ||
ctx.args[0].toLowerCase() === 'disable')
    ) {
      await global.db.del(`logs-${ctx.message.guildID}`)
      return ctx.send(`:white_check_mark: ${ctx.message.author.mention} **|** ${
        ctx.idioma.guildLogs.disabled
        }`
      )
    }

    const logs = ctx.message.channelMentions[0] || await global.star.getRESTChannel(ctx.args[0])

    if (!logs) {
      return ctx.send(
`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.guildLogs.insertChannel.replace(
'%p',
ctx.prefix
)}`
      )
    }

    await global.db.set(`logs-${ctx.message.guildID}`, logs.id)

    const embed = new global.star.manager.Ebl()
    embed.title('<:st_tools:846423174686310473> Event Log')
    embed.description(`<:st_config:845647892932067369> ${ctx.idioma.guildLogs.success.replace('%canal', logs.name)}`)
    embed.thumbnail(global.star.user.avatarURL)
    embed.color('#dd3af0')
    return ctx.send(embed.create)
  }
}
