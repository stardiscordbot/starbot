const {MessageEmbed} = require ("discord.js");
const mongoose = require("mongoose");
const economy = require("../../mongodb/economy.js");
const config = require('../../config.json');
const c = require('colors')

module.exports.run = async (client, message, args, prefix) => {

    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

    economy.findOne({ User: user.id }, async(err, data) => {
        if(err) {
        console.log((`[ERRO] - ${err}`)) 
        }
        if (!data) {
        let embed = new MessageEmbed()
          .setTitle(`${client.user.username} | Banco`)
          .setDescription(`**Carteira:** \`0\`\n**Banco:** \`0\``)
          .setColor(config.color)
          message.channel.send(embed)
        } else if (data) {
        let embed = new MessageEmbed()
        .setTitle(`${client.user.username} | Banco`)
        .setDescription(`**Carteira:** \`${data.economy}\`\n**Banco:** \`${data.Bank}\``)
        .setColor(config.color)
        message.channel.send(embed)
        }
    })

},
exports.help = {
    name: 'balance',
    aliases: ['money', 'bal', 'banco', 'carteira', 'cash', 'bank', 'dinheiro'],
    status: 'on',
    category: 'economy'
}