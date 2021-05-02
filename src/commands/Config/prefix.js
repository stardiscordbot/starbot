module.exports = class NQNCommand {
    constructor(){
      return {
        permissoes: {
          membro: ['MANAGE_GUILD'], //Permissoes que o usuario necessita
          bot: ['EMBED_LINKS'], //Permissoes que o bot necessita
          dono: false //Se apenas nos devs podem usar o comando
        },
        pt: {
          nome: 'prefix',
          categoria: '⚙️ • Config',
          desc: 'Muda o prefixo do bot no servidor'
        },
        en: {
          nome: 'prefix',
          categoria: '⚙️ • Config',
          desc: 'Change the bot prefix'
        },
      aliases: ['pr', 'prefixo', 'setprefix', 'prefix'],
      run: this.run
      }
    }
    
    async run(client, message, args, prefixoCerto, idioma) {
        if(!args[0]) return message.quote(`:x: ${message.author} **|** Informe o novo prefixo.`)
        client.db.set(`prefix-${message.guild.id}`, args[0])
        message.quote(`:white_check_mark: ${message.author} **|** Prefixo alterado para: \`${args[0].replace(/`/g, '')}\``)
    }
  }
  
  //ADG