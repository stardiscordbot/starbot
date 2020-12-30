const Discord = require('discord.js')
const config = require('../../config.json')
const emoji = require('../../jsons/emojis.json')
exports.run = async (client, message, args, prefix) => {
    if(!message.member.hasPermission("MANAGE_GUILD")) return message.quote(`${emoji.nao} ${message.author}, Você não tem permissão para usar este comando!`).then(msg=> msg.delete(8000))
    
    let mensg = args.join(' ')
    if(!mensg) {
        message.quote(`${emoji.nao} ${message.author}, digite uma mensagem para inserir.`)
    return undefined;
    }

    const embed = new Discord.MessageEmbed()
    .setDescription(`${mensg}`)
    .setColor("RANDOM")
    .setFooter(`Comando Executado por ${message.author.tag} • Versão: ${config.versão}`, message.author.displayAvatarURL())
    message.quote(embed)
}

exports.help = {
    name: "embed",
    aliases: ['sendembed'],
    status: 'on',
    category: 'others'
}