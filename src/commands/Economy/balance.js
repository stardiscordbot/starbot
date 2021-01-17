const Discord = require ("discord.js");
const mongoose = require("mongoose");
const Money = require("../../mongodb/money.js");
const config = require('../../config.json');
const emoji = require('../../jsons/emojis.json')

module.exports.run = async (client, message, args, prefix) => {
    let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    const bot = new Discord.MessageEmbed()
    .setAuthor(`•  ${client.user.username} | Erro`, 'https://cdn.discordapp.com/emojis/753735889783357560.gif?v=1')
    .setDescription(`${emoji.bot} bot não pode ter conta em meu banco`)
    .setThumbnail(client.user.displayAvatarURL({dynamic:true}))
    .setColor(config.color)
    if(target.user.bot) return message.quote(bot);

    Money.findOne({
        userID: target.user.id,
    }, async (err, money) => {
        let balanceEmbed = new Discord.MessageEmbed()
        .setTitle(`${client.user.username} | Banco`)
        .setThumbnail(client.user.displayAvatarURL({dynamic:true}))
        .setColor(config.color);

        if(!money) {
            balanceEmbed.setDescription(`Usuário: **${target.user.tag}**\nSaldo: **0**`)
        } else if(money) {
            balanceEmbed.setDescription(`Usuário: **${target.user.tag}**\nSaldo: **${money.coins.toLocaleString()}**`)
        }

        message.quote(balanceEmbed);
    });
    },

exports.help = {
    name: 'balance',
    aliases: ['money'],
    status: 'on',
    category: 'economy'
}