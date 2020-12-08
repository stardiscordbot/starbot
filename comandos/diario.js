const Discord = require("discord.js");
const mongoose = require("mongoose");
const config = require('../config.json')
const dbUrl = config.mongo;
const talkedRecently = new Set();

mongoose.connect(dbUrl, {
    useNewUrlParser: true
});
const Money = require("../mongodb/money.js");

module.exports.run = async (client, message, args, prefix) => {

        let dailyCoins = 250;
if (talkedRecently.has(message.author.id)) {
            const espere = new Discord.MessageEmbed()
            .setTitle('ERRO')
            .setDescription(`Espere 1 dia para pegar seu bonûs diario de novo \`${message.author.tag}\``)
            .setColor('RED')
            message.quote(espere);
    } else {

           Money.findOne({
            userID: message.author.id
        }, async (err, money) => {
            if(err) console.log(err);
            if(!money) {
                const newMoney = new Money({
                    userID: message.author.id,
                    coins: dailyCoins
                });

                await newMoney.save().catch(e => console.log(e));
            } else if(money) {
                money.coins = money.coins + dailyCoins;
                await money.save().catch(e => console.log(e));
            }
        });
        const diario = new Discord.MessageEmbed()
        .setTitle('Bonûs Diario!')
        .setDescription(`${message.author.username} Você ganhou seu bonûs diario de ${dailyCoins} StarCoins.`)
        .setColor('00FF7F')
        message.quote(diario);

        talkedRecently.add(message.author.id);
        setTimeout(() => {
          talkedRecently.delete(message.author.id);
        }, 86400000);
    }

         },
exports.help = {
    name: 'diario',
    aliases: ['daily']
}