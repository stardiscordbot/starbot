const Discord = require('discord.js');
const config = require('../../config.json');
const emoji = require('../../jsons/emojis.json')
const dev = require('../../mongodb/devperm.js')
const process = require("child_process")
  
module.exports.run = async (client, message, args, prefix) => {
    dev.findOne({_id:message.author.id}, async (err, db) => {
        // Caso não tenha perm
        if(!db) {
            message.quote(`${emoji.nao} ${message.author}, você não tem permissão para usar meu eval`)
        }
        // Se o User for dev
        if(db) {
            if (!args.join(" ")) { return message.reply(`${emoji.nao} Escreva o Comando!`) }

            message.quote(`${emoji.sim} Aguarde...`)
            process.exec(args.join(" "), (error, stdout) => {

            let response = (error || stdout);

            message.quote(response, { code: "asciidoc", split: "\n" }).catch(err => message.channel.send(err));
            })
        }   
        // Fim
        })
    }
exports.help = {
    name: 'console',
    aliases: ['print'],
    status: 'on',
    category: 'dev'
}