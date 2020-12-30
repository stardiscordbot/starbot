const Discord = require("discord.js");
const config = require('../../config.json');

exports.run = (client, message, args, prefix) => {
    let embed = new Discord.MessageEmbed()
    .setThumbnail(client.user.displayAvatarURL())
    .setColor(config.color)
    .addField("Star:tm:", `[Adicionar!](https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=2146958591)`, true)
    .addField("Suporte", `[Entrar!](https://discord.gg/2pFH6Yy)`, true)
    message.quote(embed);
}
exports.help = {
    name: 'invite',
    aliases: ['convite', 'convidar'],
    status: 'on'
}