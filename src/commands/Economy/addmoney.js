const Discord = require('discord.js');
const config = require('../../config.json');
const Money = require('../../mongodb/money.js')
const emoji = require('../../jsons/emojis.json');
const dev = require('../../mongodb/devperm.js');
  
module.exports.run = async (client, message, args, prefix) => {
    dev.findOne({_id:message.author.id}, async (err, db) => {
        // Caso não tenha perm
        if(!db) {
            message.quote(`${emoji.nao} ${message.author}, você não tem permissão para usar meu eval`)
        }
        // Se o User for dev
        if(db) {
            if(!args[0]) return message.quote(`${emoji.nao} ${message.author}, eu preciso que você me dê o id de algum usuário para adicionar o dinheiro`)
            if(isNaN(args[0])) return message.quote(`${emoji.nao} ${message.author}, eu preciso de um id válido, você sabe que \`${args[1]}\` não é um número`)
            if(!args[1]) return message.quote(`${emoji.nao} ${message.author}, eu preciso que você me dê o valor para adicionar o dinheiro`)
            if(isNaN(args[1])) return message.quote(`${emoji.nao} ${message.author}, eu preciso de um valor válido, você sabe que \`${args[1]}\` não é um número`)
            if(args[0].length < 18 || args[0].length > 18) return message.quote(`${emoji.nao} ${message.author}, você sabe que um id tem 18 caracteres então porque colocou \`${args[0]}\`?`)
            Money.findOne({
                userID: args[0],
            }, async (err, money) => {
                if(err) console.log(err);
                if(!money) {
                    let stcoins = args[1]
                    const newMoney = new Money({
                        userID: message.author.id,
                        coins: stcoins
                    });
                    await newMoney.save().catch(e => console.log(e));
                    message.quote(`${emoji.sim} ${message.author}, dinheiro adicionado com sucesso`)
                } else {
                    let adicionar = args[1]
                    money.coins = money.coins + adicionar;
                    await money.save().catch(e => console.log(e));
                    message.quote(`${emoji.sim} ${message.author}, dinheiro adicionado com sucesso`)
                }

            })
        }   
        // Fim
    })
    }
exports.help = {
    name: 'addmoney',
    aliases: ['addcoins', 'adddreams', 'givemoney'],
    status: 'on',
    category: 'economy'
}