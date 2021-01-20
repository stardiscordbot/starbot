const Discord = require('discord.js')
const emoji = require('../../jsons/emojis.json')

exports.run = async (client, message, args) => {

    try {

    const guild = client.guilds.cache.get(args[0])
    const icon = guild.iconURL()

    if(icon == 'null') {
        icon = 'https://triunfo.pe.gov.br/pm_tr430/wp-content/uploads/2018/03/sem-foto.jpg'
    }

    if(!args[0]) {
        guild = message.guild
    }

    if(isNaN(args[0])) return;
    const embed = new Discord.MessageEmbed()
    .setAuthor(`${guild.name}`, 'https://cdn.discordapp.com/emojis/314003252830011395.png')
    .addField('<:membros:771775720820310016> Membros', `\`${guild.name} possui ${guild.memberCount} membros\``)
    .setThumbnail(icon)
    message.quote(embed)
    } catch(err) {
        message.quote(`${emoji.nao} ${message.author}, ocorreu um erro ao executar este comando:\n\`\`\`js\n${err}\n\`\`\``)
        console.log(`${err}`.red)
    }

}
exports.help = {
    name: 'serverinfo',
    aliases: ['si', 'guildinfo', 'gi'],
    category: 'others',
    status: 'off'
}