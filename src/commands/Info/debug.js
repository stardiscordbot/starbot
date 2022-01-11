module.exports = class EvalCommand {
  constructor () {
    return {
      permissoes: {
        membro: [],
        bot: [],
        dono: false
      },
      pt: {
        nome: 'debug',
        categoria: '📖 • Informação',
        desc: 'Mostar informações de uma forma direta'
      },
      en: {
        nome: 'debug',
        categoria: '📖 • Information',
        desc: 'Show information in a direct way'
      },
      aliases: ['deb', 'de'],
      run: this.run
    }
  }

  async run (ctx) {
    const pidusage = require('pidusage')
    const stats = await pidusage(process.pid)

    const data = await global.db.all()
    ctx.send(`> :white_check_mark: ${ctx.message.author.mention} **|** Minhas Informações:\n\n<:st_db:930503530215792661>  ›  **Database:** \`${data.length} arquivos\`;\n<:st_host:930503337521070122>  ›  **Consumo:** \`${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB | ${stats.cpu.toFixed(2)}% CPU\`;\n<:zu_info:911303533859590144>  ›  **Servidores:** \`${global.star.guilds.size} servidores\`.`)
  }
}

// BONEE :) - LRD DIZ: Por isso fico uma merda.
