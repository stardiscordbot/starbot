module.exports = class PingCommand {
  constructor () {
    return {
      permissoes: {
        membro: ['manageChannels'], // Permissoes que o usuario necessita
        bot: ['manageChannels'], // Permissoes que o bot necessita
        dono: false // Se apenas nos devs podem usar o comando
      },
      pt: {
        nome: 'renamechannel',
        categoria: '🔨 • Moderação',
        desc: 'Limpe as mensagens de algum canal'
      },
      en: {
        nome: 'renamechannel',
        categoria: '🔨 • Moderation',
        desc: 'See bot latency'
      },
      aliases: ['renomearcanal'],
      run: this.run
    }
  }

  async run (ctx) {
    const name = ctx.args.join(' ').replace('&', '＆').replace('|', '│')
    ctx.message.channel.edit({
      name
    }).then((channel) => {
      ctx.send(`:white_check_mark: ${ctx.message.author.mention} **|** Nome alterado`)
    })
  }
}
