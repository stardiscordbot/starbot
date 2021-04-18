module.exports = class ExemploCommand {
    constructor(){
      return {
        permissoes: {
          membro: [], //Permissoes que o usuario necessita
          bot: [], //Permissoes que o bot necessita
          dono: true //Se apenas nos devs podem usar o comando
        },
        pt: {
          nome: 'botinfo',
          categoria: '📖 • Info',
          desc: 'Descrição'
        },
        en: {
          nome: 'botinfo',
          categoria: '📖 • Info',
          desc: 'Description'
        },
      aliases: ['bi', 'star', 'starinfo', 'si'],
      run: this.run
      }
    }
    
    async run(client, message, args, prefixo, idioma) {
      return message.channel.send(`demostração de comando em ação:\nargs: ${args.join(' ')}\nprefixo: ${prefixo}`)
    }
  }
  
  //Nome de quem fez ou ajudou