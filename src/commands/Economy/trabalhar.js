const Discord = require("discord.js");
const mongoose = require("mongoose");
const config = require('../../config.json')
const dbUrl = config.mongo;

mongoose.connect(dbUrl, {
    useNewUrlParser: true
});

const Money = require("../../mongodb/money.js");

module.exports.run = (client, message, args, prefix) => {
        let earnedCoins = Math.floor(Math.random() * 100) + 1;
    Money.findOne({
        userID: message.author.id
    }, async (err, money) => {
        if(err) console.log(err);
        if(!money) {
            const newMoney = new Money({
                userID: message.author.id,
                coins: earnedCoins
            });

            await newMoney.save().catch(e => console.log(e));
        } else if(money) {
            money.coins = money.coins + earnedCoins;
            await money.save().catch(e => console.log(e));
        }
    });
    const concluido = new Discord.MessageEmbed()
    .setTitle('Trabalho Concluido')
    .setDescription(`Você acaba de receber \`${earnedCoins}\` StarCoins!`)
    .setColor('BLUE')
    message.quote(concluido);
    },
exports.help = {
    name: 'trabalhar',
    aliases: ['work'],
    category: 'economy'
}