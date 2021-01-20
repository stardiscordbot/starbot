const {MessageEmbed} = require("discord.js");
const ms = require("parse-ms");
const mongoose = require("mongoose");
const config = require('../../config.json')

const economy = require("../../mongodb/economy.js");

module.exports.run = async (client, message, args, prefix) => {

    let user = message.author;

    let timeout = 86400000;
    let amount = 6000;
  
    economy.findOne({ User: user.id },async(err, data)=>{
      if(err) message.reply(err)

      if (!data) {
        let newEconomy = new economy({
          User: user.id,
          economy: amount,
          Bank: 0,
          Tag: message.author.tag,
          DailyTime: Date.now()
      }).save();

      let economyEmbed = new MessageEmbed()
      .setTitle(`${client.user.username} | Daily`)
      .setColor("00FF00")
      .setDescription(`Você coletou: \`${amount}\` estrelas diárias`);
      message.channel.send(economyEmbed)
    } else {
      if (data.DailyTime !== null && timeout - (Date.now() - data.DailyTime) > 0) {

        let time = ms(timeout - (Date.now() - data.DailyTime));
      
        let timeEmbed = new MessageEmbed()
        .setTitle(`${client.user.username} | Daily`)
        .setColor("FF0000")
        .setDescription(`Você já coletou suas estrelas diárias\n\nColete novamente em: **${time.hours}:${time.minutes}:${time.seconds}**`);
        message.channel.send(timeEmbed)
      } else {
  
        data.economy = data.economy + amount;
        data.DailyTime = Date.now();
        data.save()
        let economyEmbed = new MessageEmbed()
        .setTitle(`${client.user.username} | Daily`)
        .setColor("00FF00")
        .setDescription(`Você coletou: \`${amount}\` estrelas diárias`);
        message.channel.send(economyEmbed)
    }
  }
});
}
exports.help = {
    name: 'diario',
    aliases: ['daily'],
    category: 'economy'
}