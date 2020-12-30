const Discord = require("discord.js");   
const axios = require('axios')
const config = require('../../config.json');
const pr = require('../../mongodb/prefix.js');
const Guild = require('../../mongodb/guild.js');

exports.run = async (client, message, args, prefix) => {
    const apiTotal = `https://economia.awesomeapi.com.br/json/all/USD-BRL,EUR-BRL,BTC-BRL,CAD-BRL`;

    const {
      data: { USD, EUR, BTC, CAD },
    } = await axios.get(apiTotal);

    const embed = await new Discord.MessageEmbed()
      .setTitle("Cotação do Real nas pricipais Moedas:")
      .setColor(config.color)
      .setFooter(`Comando Executado por ${message.author.tag} • Versão: ${config.versão}`, message.author.displayAvatarURL({ dynamic: true, size: 2048 }))
      .addFields(
        { name: "🇺🇸 Dolar", value: `R$ ${USD.bid}`, inline: true },
        { name: "🇪🇺 Euro", value: `R$ ${EUR.bid}`, inline: true },
        { name: "₿ Bitcoin", value: `R$ ${BTC.bid}`, inline: true },
        { name: "🇨🇦 Dolar canadense", value: `R$ ${CAD.bid}`, inline: true }
      );
    message.quote(embed);
  },
exports.help = { 
  name: 'cotacao', 
  aliases: ['cotação', 'dolar', 'real', 'bitcoin', 'euro', 'canadense'],
  status: 'on',
  category: 'others'
}