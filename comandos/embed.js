const Discord = require('discord.js')
const config = require('../config.json')
exports.run = async (client, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.quote(`${message.author}, você não possui permissão para executar esse comando.`).then(msg=> msg.delete(8000))
    
    let mensg = args.join(' ')
    if(!mensg) {
        message.quote(`${message.author}, digite uma mensagem para inserir.`)
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
    status: 'on'
}