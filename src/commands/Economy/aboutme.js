module.exports = class ExemploCommand {
    constructor(){
      return {
        permissoes: {
          membro: [], //Permissoes que o usuario necessita
          bot: [], //Permissoes que o bot necessita
          dono: false //Se apenas nos devs podem usar o comando
        },
        pt: {
          nome: 'sobremim',
          categoria: '💸 • Economia',
          desc: 'Altera o seu "Sobre Mim" para algum texto de sua escolha'
        },
        en: {
          nome: 'aboutme',
          categoria: '💸 • Economy',
          desc: 'Change your "About Me" to any text of your choice'
        },
      aliases: ['example'],
      run: this.run
      }
    }
    
    async run(client, message, args, prefixoCerto, idioma) {
      
        if(!args[0]) return message.quote(`:x: ${message.author} **|** ${idioma.sobre.nada.replace("%p", prefixoCerto)}`)

        client.db.set(`about-${message.author.id}`, `${args.join(" ")}`)

        message.quote(`✅ ${message.author} **|** ${idioma.sobre.alt.replace("%t", args.join(' ').replace(/`/g, ''))}`)

    }
  }
  
  //Nome de quem fez ou ajudou