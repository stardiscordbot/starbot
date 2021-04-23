module.exports = class BotinfoCommand {
    constructor(){
      return {
        permissoes: {
          membro: [], //Permissoes que o usuario necessita
          bot: [], //Permissoes que o bot necessita
          dono: false //Se apenas nos devs podem usar o comando
        },
        pt: {
          nome: 'botinfo',
          categoria: '📖 • Info',
          desc: 'Mostra as informações do bot'
        },
        en: {
          nome: 'botinfo',
          categoria: '📖 • Info',
          desc: 'Show the botinfo'
        },
      aliases: ['bi', 'star', 'starinfo', 'si'],
      run: this.run
      }
    }
    
    async run(client, message, args, prefixo, idioma) {
      
      let servidores = await client.shard.fetchClientValues('guilds.cache.size')
      let total_servers = servidores.reduce((prev, val) => prev + val)
      let embed = new (require('discord.js')).MessageEmbed()
      .setAuthor(client.user.username, client.user.displayAvatarURL({ size: 2048 }))
      .setDescription(`<:st_host:830841046153691197> Host: VPS [Linux](https://discord.gg/8tapRMCm)`)
      .setColor("BLUE")
      .addFields(
          { name: "Guilds", value: `**${total_servers}** Guilds`, inline: true },
          { name: "Uptime", value: `**${client.utils.time(client.uptime)}**`, inline: true },
          { name: "Ping", value: `**${Math.round(client.ws.ping)}**ms`, inline: true },
          { name: "Memory", value: `**${client.utils.formatBytes(process.memoryUsage().rss)}**`, inline: true },
          { name: "Shards", value: `Shard: ${client.shard ? client.shard.count : '1'} **[${eval(message.guild.shard.id+1)}]**`, inline: true },
      )
      return message.quote(embed)
      
    }
  }
  
  //Nome de quem fez ou ajudou
