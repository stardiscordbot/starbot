const Discord = require("discord.js");   
const cheerio = require('cheerio')
const axios = require('axios')
const config = require('../config.json');
const pr = require('../mongodb/prefix.js');
const Guild = require('../mongodb/guild.js');

exports.run = async (client, message, args) => {
    try {
        const fetchData = async(url) => {
            const result = await axios.get(url)
            return result.data
        }
        const content = await fetchData(`https://www.remessaonline.com.br/cotacao/cotacao-dolar`)
        const $ = cheerio.load(content)
        const content2 = await fetchData(`https://www.remessaonline.com.br/cotacao/cotacao-euro`)
        const $2 = cheerio.load(content2)
        $('div.style__Text-sc-27fg4f-2.ddwOcG').each((i, el) => {
            $2('div.style__Text-sc-27fg4f-2.ddwOcG').each((i, e) => {
                cotDolar = $(el).text()
                cotEuro = $2(e).text()
                const dolarEmbed = new Discord.MessageEmbed()
                    .setTitle(`${client.user.username} | Cotação`)
                    .addField('💸 DOLAR:', `R$ ${cotDolar}`, true)
                    .addField('💸 EURO:', `R$ ${cotEuro}`, true)
                    .setColor(config.color)
                message.channel.send(dolarEmbed)
            })
        })
    } catch (err) {
        const embed = new Discord.MessageEmbed()
            .setTitle(`${client.user.username} | Erro`)
            .setDescription("**Possíveis Motivos:**\n\n Erro de requisição. (Tente novamente)\n API fora do ar.")
            .addField('Erro:', `\`${err}\``)
            .setColor(config.color)
            .setTimestamp()
        message.channel.send(embed)
    }
}
exports.help = { 
  name: 'cotacao', 
  aliases: ['cotação', 'dolar', 'real'],
  status: 'on'
}