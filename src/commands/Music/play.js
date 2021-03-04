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
          categoria: '(Emoji) Testes',
          desc: 'Descrição'
        },
        en: {
          nome: 'play',
          categoria: '(Emoji) Testing',
          desc: 'Description'
        },
      aliases: ['p'],
      run: this.run
      }
    }
    
    async run(client, message, args, prefixo, idioma) {

    const play = message.client.manager.players.get(message.guild.id)
     
    const { channel } = message.member.voice;

    }
  }
  
  //ADG