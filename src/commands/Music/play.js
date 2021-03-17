module.exports = class PlayCommand {
    constructor(){
      return {
        permissoes: {
          membro: [], //Permissoes que o usuario necessita
          bot: [], //Permissoes que o bot necessita
          dono: false //Se apenas nos devs podem usar o comando
        },
        pt: {
          nome: 'play',
          categoria: '🎵 • Música',
          desc: 'Descrição'
        },
        en: {
          nome: 'play',
          categoria: '🎵 • Music',
          desc: 'Description'
        },
      aliases: ['tocar', 'play', 'p'],
      run: this.run
      }
    }
    
    async run(client, message, args, prefixo, idioma) {

        if(!args[0]) return message.quote(`:x: ${message.author} **|** ${idioma.play.nada}`)
        client.player.play(message, args.join(" "), { firstResult: true })

    }
  }
  
  //ADG