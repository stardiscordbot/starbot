module.exports = (client) => {
  client.on("guildMemberAdd", async member => {
    let idioma = (await client.db.get(`idioma-${member.guild.id}`)) || 'pt';
		
		idioma = client.lang[idioma];
		
		bemvindo()
		autoRole()
		
		async function bemvindo(){
    const welcome = await client.db.get(`welcome-${member.guild.id}`);

    const embed = new (require('discord.js-light')).MessageEmbed()

    .setTitle(member.guild.name)
    .setColor('ff0000')
    .setDescription(idioma.welcome.message.replace('%m', member).replace('%g', member.guild.name).replace('%c', member.guild.memberCount))

    if(welcome) {
      let channel = await client.channels.forge(welcome)
      await channel.send({embed})
    }
		}
		
    async function autoRole(){
      let cargo = await client.db.get(`autorole-${member.guild.id}`)
      if(cargo) member.roles.add(cargo, 'AutoRole') 
    }
  })
}
//ADG e Davi