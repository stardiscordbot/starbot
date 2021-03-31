module.exports = (client) => {
  client.on("guildMemberRemove", async member => {
    let idioma = (await client.db.get(`idioma-${member.guild.id}`)) || 'pt';
		
		idioma = client.lang[idioma];
		
		saida()
		
		async function saida(){
    const welcome = await client.db.get(`leave-${member.guild.id}`);

    const embed = new (require('discord.js')).MessageEmbed()

    .setTitle(member.guild.name)
    .setColor('ff0000')
    .setDescription(idioma.leave.message.replace('%m', member).replace('%g', member.guild.name).replace('%c', member.guild.memberCount))

    if(welcome) {
      let channel = await client.channels.cache.get(welcome)
      await channel.send({embed})
    }
		}

  })
}
//Davi