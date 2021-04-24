module.exports = class NQNCommand {
    constructor(){
      return {
        permissoes: {
          membro: ['MANAGE_GUILD'], //Permissoes que o usuario necessita
          bot: ['EMBED_LINKS'], //Permissoes que o bot necessita
          dono: false //Se apenas nos devs podem usar o comando
        },
        pt: {
          nome: 'faustao',
          categoria: '⚙️ • Config',
          desc: 'Ativa o faustao'
        },
        en: {
          nome: 'nqn',
          categoria: '⚙️ • Config',
          desc: 'Activates faustao'
        },
      aliases: ['fst', 'evento', 'f-s-t'],
      run: this.run
      }
    }
    
    async run(client, message, args, prefixoCerto, idioma) {

        if(!args[0]) return message.quote(`:x: ${message.author} **|** ${idioma.fst.arg.replace(/%p/g, prefixoCerto)}`)
        if(args[0] == "on") {
            message.react("✔️")
            client.db.set(`fst-${message.guild.id}`, "true")
        }

        if(args[0] == "off") {
            message.react("✔️")
            client.db.delete(`fst-${message.guild.id}`)
        }

    }
  }
  
  //Nome de quem fez ou ajudou