module.exports = class ExemploCommand {
    constructor(){
      return {
        permissoes: {
          membro: [], //Permissoes que o usuario necessita
          bot: [], //Permissoes que o bot necessita
          dono: true //Se apenas nos devs podem usar o comando
        },
        pt: {
          nome: 'stop',
          categoria: '🎵 • Música',
          desc: 'Para a música atual'
        },
        en: {
          nome: 'stop',
          categoria: '🎵 • Music',
          desc: 'Stop the current song'
        },
      aliases: ['stop', 'parar', 'st', 'leave',' bye', 'search'],
      run: this.run
      }
    }
    
    async run(client, message, args, prefixo, idioma) {
        const player = client.manager.players.get(message.guild.id)
        if(!player) return message.channel.send(`:x: ${message.author} **|** ${idioma.player.not}`)
        const {channel} = message.member.voice
        if(!channel) return message.channel.send(`:x: ${message.author} **|** ${idioma.player.noc2}`);
        if (channel.id !== player.voiceChannel) return message.channel.send(`:x: ${message.author} **|** ${idioma.player.noc1}`);
        player.destroy();
        const sembed = new (require("discord.js")).MessageEmbed()
        .setDescription(`${idioma.player.stop}`)
        .setColor("F47FFF")
        return message.channel.send(sembed);
    }
  }
  
  //ADG