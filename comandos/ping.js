const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
  
  let ping = await client.shard.fetchClientValues('ws.ping')
  let ping_media = ping.reduce((prev, val) => prev + val)


  message.channel.send(`\n**🏓 | ${message.author} Pong!** (Shard: ${client.shard.ids}/${client.options.shardCount})\nLatência do Servidor: \`${Date.now()-message.createdTimestamp}ms\`\nLatência da API: \`${ping_media}ms\``).then(msg=> {
    
  const collectfilter = (reaction, user) => user.id === message.author.id;
  const coletor = msg.createReactionCollector(collectfilter);

  coletor.on('collect', r => {          
       msg.edit(`${message.author}, eu te amo <:catblush:774345793271889920>`);
     })
  })
}
exports.help = {
    name: 'ping',
    aliases: ['ws']
}