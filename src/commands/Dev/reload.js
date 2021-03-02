module.exports = class EvalCommand {
  constructor() {
    return {
      permissoes: {
        membro: [],
        bot: [],
        dono: true
      },
      pt: {
        nome: 'reload',
        categoria: '💻 • Developer',
        desc: 'Restarta os comandos'
      },
      en: {
        nome: 'reload',
        categoria: '💻 • Developer',
        desc: 'Reload the commands'
      },
      aliases: ['r', 'recarregar'],
      run: this.run
    }
  }
  async run(client, msg, argumentos, prefixoCerto) {
    client.removeAllListeners()
    process.removeAllListeners()
    
    for(var aa in require.cache){
     //console.log(aa)
    if(aa.includes('commands')||aa.includes('utils')||aa.includes('events')) delete require.cache[aa]
    }
    
    require('../../utils/commandHandler')(client)
    require('../../utils/eventHandler')(client)
    require('../../utils/multiLanguage')(client)
    
    setTimeout(()=>{
    return msg.channel.send(`:white_check_mark: **|** ${msg.author} ${client.commands.size} comandos e ${client._eventsCount} eventos recarregados com sucesso.`)
    },800)
  }
}

// Davi