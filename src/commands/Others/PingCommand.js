const Discord = require('discord.js');

module.exports.run = async (client, message, args, prefix) => {

  message.quote(`\n**🏓 | ${message.author} Pong!**\nLatência do Servidor: \`${Date.now()-message.createdTimestamp}ms\`\nLatência da API: \`${client.ws.ping}ms\``).then(msg=> {
    
  const collectfilter = (reaction, user) => user.id === message.author.id;
  const coletor = msg.createReactionCollector(collectfilter);

  coletor.on('collect', r => {
       r.users.remove(message.author.id)
       msg.edit(`${message.author}, eu te amo <:catblush:774345793271889920>`).then(msg=>{
        const collectfilter = (reaction, user) => user.id === message.author.id;
        const coletor = msg.createReactionCollector(collectfilter);
        coletor.on("collect", r => {
          msg.edit(`\n**🏓 | ${message.author} Pong!**\nLatência do Servidor: \`${Date.now()-message.createdTimestamp}ms\`\nLatência da API: \`${client.ws.ping}ms\``)
        })
       })
     })
  })
}
exports.help = {
    name: 'ping',
    aliases: ['ws'],
    category: 'others'
}