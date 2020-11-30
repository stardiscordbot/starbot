const Discord = require ("discord.js");
const mongoose = require("mongoose");
const Money = require("../mongodb/money.js");
const config = require('../config.json')
const dbUrl = config.mongo;

mongoose.connect(config.mongo, {
    useNewUrlParser: true
});

module.exports.run = async (client, message, args) => {
        let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    const bot = new Discord.MessageEmbed()
    .setTitle('ERRO')
    .setDescription('BOT não pode ter conta em meu banco')
    .setColor(config.color)
    if(target.user.bot) return message.channel.send(bot);

    Money.findOne({
        userID: target.user.id,
    }, async (err, money) => {
        let balanceEmbed = new Discord.MessageEmbed()
        .setTitle(`${client.user.username} | Banco`)
        .setThumbnail('https://media.discordapp.net/attachments/754461904575135815/771738697375940648/starredonda.png')
        .setFooter(`Comando Executado por ${message.author.tag} • Versão: ${config.versão}`, message.author.displayAvatarURL())
        .setColor(config.color);

        if(!money) {
            balanceEmbed.setDescription(`Usuário: **${target.user.tag}**\nSaldo: **0**`)
        } else if(money) {
            balanceEmbed.setDescription(`Usuário: **${target.user.tag}**\nSaldo: **${money.coins.toLocaleString()}**`)
        }

        message.channel.send(balanceEmbed);
    });
    },

exports.help = {
    name: 'balance',
    aliases: ['money'],
    status: 'on'
}