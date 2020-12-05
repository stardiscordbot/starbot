const Discord = require('discord.js')
const c = require('../config.json')
exports.run = async (client, message, args) => {

    let mensg = args.join(' ')
    if (!mensg) {
        message.quote(`${message.author}, digite uma sugestão. :mailbox_with_no_mail:`)
        return undefined;
    }

    const embed = new Discord.MessageEmbed()
        .setAuthor(`Sugestão de ${message.author.tag}`)
        .setDescription(`\`\`\`${mensg}\`\`\``)
        .setColor('RANDOM')
        .setThumbnail(message.author.AvatarURL)
    client.channels.cache.get(`754691920625926228`).send(embed)
        .then(function (msg) {
            msg.react("a:sim:753735844812161034");
            msg.react("a:nao:753735889783357560"); 
            message.quote(`**Sua sugestão foi enviada! :mailbox_with_no_mail:**`)
        }).catch(function (error) {
            console.log(error);
        });
}
exports.help = {
    name: 'sugestao',
    aliases: ['sugestão', 'sugerir', 'suggest']
}