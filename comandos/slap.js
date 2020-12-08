const Discord = require('discord.js');
const superagent = require('superagent');
const c = require('../config.json');

exports.run = async (client, message, args, prefix) => {

    if (!message.mentions.users.first()) return message.quote(`🍒 **»** **${message.author}**, você precisa mencionar um membro.`);
    if (message.mentions.users.first().id === "719524114536333342") return message.reply('Por que deseja me bater? O que eu te fiz?!');
    if (message.mentions.users.first().id === "717766639260532826") return message.reply(`não deixarei você bater em meu criador!`);
    const { body } = await superagent
    .get("https://nekos.life/api/v2/img/slap");
    let avatar = message.author.displayAvatarURL({format: 'png'});
    const embed = new Discord.MessageEmbed()
    .setTitle('Tapa')
    .setColor("#ff9900")
    .setDescription(`**${message.author.username}** deu um tapa em **${message.mentions.users.first().username}**!`)
    .setThumbnail(avatar)
    .setImage(body.url) 
    message.quote({embed})
}
exports.help = {
    name: 'slap',
    aliases: ['tapa']
}