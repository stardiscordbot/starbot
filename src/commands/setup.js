const Discord = require('discord.js')
const mongoose = require('mongoose')
const config = require('../config.json')
const emoji = require('../jsons/emojis.json')
const Guild = require('../mongodb/guild.js')

exports.run = async (client, message, args, prefix) => {
    if(!message.member.hasPermission('MANAGE_GUILD')) return message.quote(`<a:nao:753735889783357560> ${message.author}, Você não tem permissão para usar este comando!`);

    const embed = new Discord.MessageEmbed()
    .setTitle(`Setup | ${client.user.username}`)
    .setThumbnail(client.user.displayAvatarURL({dynamic: true, size: 2048}))
    .setColor(config.color)
    .setDescription(`Olá, ${message.author}, se está vendo isso é porque deseja me configurar neste servidor, para iniciar o setupo completo ultilize: \`${prefix}setup all\`, podendo também ser setado a parte:`)
    .addField(`Canal de boas Vindas:`, `\`${prefix}setup welcome\``, 'https://media.discordapp.net/attachments/754461904575135815/790918539606622228/welcomee.png')
    .addField(`Canal de logs:`, `\`${prefix}setup logs\``, 'https://cdn.discordapp.com/emojis/767235266272034870.png?v=1')
    .addField(`Custom prefix:`, `\`${prefix}setup prefix\``, 'https://cdn.discordapp.com/emojis/556685322227023904.png?v=1')
    message.quote(embed)
    
    if(args[0] == 'all') {
        let channel = message.mentions.channels.first() || client.channels.cache.get(args[1])
        const setup1 = new Discord.MessageEmbed()
        .setTitle(`Setup | ${client.user.username}`)
        .setDescription(`Mencione o canal de boas vindas!`)
        .setThumbnail(client.user.displayAvatarURL({dynamic: true, size: 2048}))
        .setColor(config.color)
        const m = message.channel.send(setup1)
        
        await message.channel.awaitMessages(m => (m.author.id === message.author.id), {
            max: 1,
            time: 20000,
            errors: ["time"]
        }).catch((err) => {
            message.delete()
            return message.quote(`${emoji.nao} | O Tempo acabou, setup cancelado!`);
        });
        Guild.findOne({guildID:message.guild.id}, (err, db) => {
            if(!db) {
            let channel = message.mentions.channels.first() || client.channels.cache.get(args[0])
              let save = new Guild ({
                _id: new mongoose.Types.ObjectId(),
                guildID: `${message.guild.id}`,
                welcomeChannel: `${channel.id}`
              })
              const welcomeembed = new Discord.MessageEmbed()
              .setTitle(`Setup | ${client.user.username}`)
              .setThumbnail(client.user.displayAvatarURL({dynamic: true, size: 2048}))
              .setColor(config.color)
              .setDescription(`Mencione o canal que será usado para logs`)
              .addField(`${emoji.sim} Canal de boas Vindas`, `${channel.toString()}`)
              m.edit(welcomeembed)
            }
        })
    }

}
exports.help = {
    name: 'setup',
    aliases: ['configurar']
}