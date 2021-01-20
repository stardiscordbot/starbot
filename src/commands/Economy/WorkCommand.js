const {MessageEmbed} = require("discord.js");
const mongoose = require("mongoose");
const config = require('../../config.json')
const ms = require('parse-ms')

const economy = require("../../mongodb/economy.js");

module.exports.run = (client, message, args, prefix) => {
    let user = message.author;
    let timeout = 3600000;

    let replies = 
    ['Programador','Construtor','Garçom','Motorista','Chefe','Mecânico', 'Gandula', 'Caminhoneiro', 'ATC', 'PLA', 'Bombeiro',
    'Policial', 'Gerente de Aeroporto', 'Balconista', 'Babá'];

    economy.findOne({ User: user.id },async(err, data)=>{
      if(err) message.reply(err)

      let result = Math.floor((Math.random() * replies.length));
      let amount = Math.floor(Math.random() * 80) + 1;
      if(!data){
        let newEconomy = new economy({
            User: user.id,
            Money: amount,
            Bank: 0,
            Tag: message.author.tag,
            WorkTime: Date.now()
        })
        newEconomy.save(); 
        let embed1 = new MessageEmbed()
        .setTitle(`${client.user.username} | Work`)
        .setColor("00FF00")
        .setDescription(`Você trabalhou como: ${replies[result]} e ganhou \`${amount}\` estrelas.`);
        message.channel.send(embed1)
      } else {
      if (data.WorkTime !== null && timeout - (Date.now() - data.WorkTime) > 0) {
        let time = ms(timeout - (Date.now() - data.WorkTime));
    
        let timeEmbed = new MessageEmbed()
        .setTitle(`${client.user.username} | Work`)
        .setColor("FF0000")
        .setDescription(`Você já trabalhou recentemente\n\nTrabalhe novamente em: **${time.minutes}:${time.seconds}**`);
        message.channel.send(timeEmbed)
      } else {
              data.Money = data.Money + amount;
              data.WorkTime = Date.now();
              data.save().catch(err => console.log(err))
              let embed2 = new MessageEmbed()
              .setTitle(`${client.user.username} | Work`)
              .setColor("00FF00")
              .setDescription(`Você trabalhou como: ${replies[result]} e ganhou \`${amount}\` estrelas.`);
              message.channel.send(embed2)
          }
    };
  })
}
exports.help = {
    name: 'trabalhar',
    aliases: ['work'],
    category: 'economy'
}