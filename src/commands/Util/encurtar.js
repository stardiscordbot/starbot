module.exports = class ExemploCommand {
    constructor(){
      return {
        permissoes: {
          membro: [], //Permissoes que o usuario necessita
          bot: [], //Permissoes que o bot necessita
          dono: false //Se apenas nos devs podem usar o comando
        },
        pt: {
          nome: 'encurtar',
          categoria: '🪓 • Util',
          desc: 'Encurtador de URL'
        },
        en: {
          nome: 'shorten',
          categoria: '🪓 • Util',
          desc: 'URL Shortener'
        },
      aliases: ['encurtar', 'bitly', 'url', 'shorten', 'isgd'],
      run: this.run
      }
    }
    
    async run(client, message, args, prefixo, idioma) {
      const isgd = require("isgd");
      if(!args[0]) return message.quote(`:x: ${message.author} **|** ${idioma.isgd.nolink}`)
      isgd.shorten(args[0], function(res) {
        message.quote(`🔗 ${message.author} **|** ${res}`)
       });
    }
  }
  
  //ADG