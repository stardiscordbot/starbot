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
          categoria: '🎵 • Musica',
          desc: 'Toca músicas em seu servidor'
        },
        en: {
          nome: 'play',
          categoria: '🎵 • Music',
          desc: 'Play music on your server'
        },
      aliases: ['p', 'tocar', 'start'],
      run: this.run
      }
    }
    
    async run(client, msg, argumentos, prefixoCerto, idioma) {
      
      const args = argumentos;

      if(!args[0]) return msg.quote(`:x: ${msg.author} **|** ${idioma.play.nada.replace("%p", prefixoCerto)}`)

      const res = await client.manager.search(
        args.join(" "),
        msg.author
      );

      const player = client.manager.create({
        guild: msg.guild.id,
        voiceChannel: msg.member.voice.channel.id,
        textChannel: msg.channel.id,
        selfDeafen: true,
        volume: 50
      });
  
      player.connect();

      player.queue.add(res.tracks[0]);

      const adicionado = new (require("discord.js")).MessageEmbed()
      .setDescription(`${idioma.play.add} \`${res.tracks[0].title}\` | \`${msg.author.tag}\``)
      .setColor("F47FFF")

      msg.quote(adicionado);
  
      if (!player.playing && !player.paused && !player.queue.size) player.play();

      if (!player.playing && !player.paused && player.queue.totalSize === res.tracks.length) player.play();
    }
  }
  
  //ADG