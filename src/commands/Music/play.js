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
          desc: 'Descrição'
        },
        en: {
          nome: 'play',
          categoria: '🎵 • Music',
          desc: 'Description'
        },
      aliases: ['p'],
      run: this.run
      }
    }
    
    async run(client, message, args, prefixo, idioma) {

      if(!args[0]) return;

      const res = await client.manager.search(
        args.join(" "),
        message.author
      );

      const player = client.manager.create({
        guild: message.guild.id,
        voiceChannel: message.member.voice.channelID,
        textChannel: message.channel.id,
        selfDeafen: true,
        volume: 50
      });
  
      player.connect();

      player.queue.add(res.tracks[0]);

      const adicionado = new (require("discord.js")).MessageEmbed()
      .setDescription(`${idioma.play.add} \`${res.tracks[0].title}\` | \`${message.author.tag}\``)
      .setColor("F47FFF")

      message.quote(adicionado);
  
      if (!player.playing && !player.paused && !player.queue.size) player.play();

      if (!player.playing && !player.paused && player.queue.totalSize === res.tracks.length) player.play();
    }
  }
  
  //ADG