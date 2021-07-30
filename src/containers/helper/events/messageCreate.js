module.exports = class MessageEvent {
  constructor () {
    return {
      nome: 'messageCreate',
      run: this.run
    }
  }

  async run (message) {
    const { form, prefix, mon, sup } = require('../config')
    if (message.author.bot) return

    const argumentos = message.content.slice(prefix.length).trim().split(/ +/)
    const cmd = argumentos.shift().toLowerCase()
    const args = argumentos

    if (cmd === 'aprovar') {
      if (message.author.id !== '717766639260532826') return
      if (!args[0]) return message.channel.createMessage('Cadê o id do form?')
      const g = global.db.get(args[0])
      if (g) {
        message.addReaction('✅')
        const user = await global.helper.getRESTUser(g)
        const dm = await global.helper.getDMChannel(user.id)
        dm.createMessage('✅ Sua denúncia foi aprovada pela equipe da starbot, obrigado e parabéns 🥳').then(async msg => {
          global.db.del(args[0])
          const ch = await global.helper.getRESTChannel(mon)
          ch.createMessage(`__**✅ Denúncia Aprovada!**__\n\n- Autor: **${message.author.username}#${message.author.discriminator} (${message.author.id})**\n- ID do formulário: **${args[0]}**`)
        })
      } else {
        return message.channel.createMessage(':x: Formulário não encontrado.')
      }
    }
    if (message.channel.type !== 1) return
    if (message.content.toLowerCase() === 'denúncia' || message.content.toLowerCase() === 'report') {
      const proto = Math.random().toString(36).slice(2, 10)
      const link = `${form}${proto}`
      message.channel.createMessage(`✅ Está querendo denunciar algumas pessoas? Vieste ao lugar certo! Para realizar o report basta clicar no formulário!\n\n> 📋 ID do formulário: ||\`${proto}\`||\n\n🔗 Link: ${link}`).then(async msg => {
        global.db.set(proto, message.author.id)
        msg.addReaction(':ES_panda:815580024811814913')
        const ch = await global.helper.getRESTChannel(mon)
        ch.createMessage(`__**🔔 <@&${sup}>Nova Denúncia!**__\n\n- Autor: **${message.author.username}#${message.author.discriminator} (${message.author.id})**\n- ID do formulário: **${proto}**`)
      })
    }
  }
}
