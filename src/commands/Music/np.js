module.exports = class ExemploCommand {
    constructor(){
      return {
        permissoes: {
          membro: [], //Permissoes que o usuario necessita
          bot: [], //Permissoes que o bot necessita
          dono: false //Se apenas nos devs podem usar o comando
        },
        pt: {
          nome: 'nowplaying',
          categoria: '🎵 • Musica',
          desc: 'Mostra a música que está sendo tocada atualmente'
        },
        en: {
          nome: 'nowplaying',
          categoria: '🎵 • Musica',
          desc: 'Shows the song currently being played'
        },
      aliases: ['nowplaying', 'np', 'tocando', 'now'],
      run: this.run
      }
    }
    
    async run(client, message, args, prefixo, idioma) {

      const API = require("../../../utils/API")

      const player = client.manager.players.get(message.guild.id);

      const { title, duration } = player.queue.current;

      const { porgressBar } = require("music-progress-bar");

      const progressBar = porgressBar({ currentPositon: player.position > 0 ? player.position : "1", endPositon: duration, width: 10, barStyle: "▬", currentStyle: player.playing ? "🔴" : "🔴"  }, { format:" [ <bar> ] " })

      let embed = new (require("discord.js")).MessageEmbed()
      embed.setColor("F47FFF")
      embed.setDescription(`${player.playing ? API.emojis.play.id : API.emojis.pause.id} ${title}\n${progressBar} \`${player.position <= 60000 ? `${API.time2(player.position)}` : API.time2(player.position)} / ${API.time2(duration)}\``);
      message.quote(embed)

    }
  }
  
  //Nome de quem fez ou ajudou