module.exports = class ExemploCommand {
    constructor(){
      return {
        permissoes: {
          membro: [], //Permissoes que o usuario necessita
          bot: [], //Permissoes que o bot necessita
          dono: true //Se apenas nos devs podem usar o comando
        },
        pt: {
          nome: 'exemplo',
          categoria: '(Emoji) Testes',
          desc: 'Descrição'
        },
        en: {
          nome: 'exemple',
          categoria: '(Emoji) Testing',
          desc: 'Description'
        },
      aliases: ['example'],
      run: this.run
      }
    }
    
    async run(client, message, args, prefixo, idioma) {
      return message.channel.send(`demostração de comando em ação:\nargs: ${args.join(' ')}\nprefixo: ${prefixo}`)
    }
  }
  
  //Nome de quem fez ou ajudou