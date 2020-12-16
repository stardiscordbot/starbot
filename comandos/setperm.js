const Discord = require('discord.js')
const config = require('../config.json')
const dev = require('../mongodb/devperm.js')
const mod = require('../mongodb/modperm.js')

exports.run = async (client, message, args) => {
    if(message.author.id !== '717766639260532826') return message.quote(`${message.author} esse comando só pode ser usado por meu dono`)
    if(!args[0]) return message.quote(`${message.author}, escolha entre \`dev\` e \`mod\` usuário`)
    // Dev
    if(args[0] === 'dev') {
        const id = args[1]
        dev.findOne({_id:id}, async (err, db) => {
            if(db) {
                const user = await client.users.fetch(id)
                const ja = new Discord.MessageEmbed()
                .setTitle(`SetPerm | ${client.user.username}`)
                .setDescription(`\`${user.tag}\` já é meu desenvolvedor`)
                .setColor(config.color)
                .setFooter(`Comando Executado por ${message.author.tag} • Versão: ${config.versão}`, message.author.displayAvatarURL({ dynamic: true }))
                message.quote(ja)
            } if(!db) {
                const user = await client.users.fetch(id)
                const embed = new Discord.MessageEmbed()
                .setTitle(`SetPerm | ${client.user.username}`)
                .setDescription(`\`${user.tag}\` foi adicionado como desenvolvedor`)
                .setColor(config.color)
                .setFooter(`Comando Executado por ${message.author.tag} • Versão: ${config.versão}`, message.author.displayAvatarURL({ dynamic: true }))
                message.quote(embed)
                // Dev
                const add = new dev({
                    _id:id
                  }).save().catch(err => console.log(err))
                  // Mod
                  const modperm = new mod({
                    _id:id
                  }).save().catch(err => console.log(err))
            }
        })
    }
    // Fim
    // Casp Seja Mod
    if(args[0] === 'mod') {
        const id = args[1]
        mod.findOne({_id:id}, async (err, db) => {
            if(db) {
                const user = await client.users.fetch(id)
                const ja = new Discord.MessageEmbed()
                .setTitle(`SetPerm | ${client.user.username}`)
                .setDescription(`\`${user.tag}\` já é meu moderador`)
                .setColor(config.color)
                .setFooter(`Comando Executado por ${message.author.tag} • Versão: ${config.versão}`, message.author.displayAvatarURL({ dynamic: true }))
                message.quote(ja)
            } if(!db) {
                const user = await client.users.fetch(id)
                const embed = new Discord.MessageEmbed()
                .setTitle(`SetPerm | ${client.user.username}`)
                .setDescription(`\`${user.tag}\` foi adicionado como moderador`)
                .setColor(config.color)
                .setFooter(`Comando Executado por ${message.author.tag} • Versão: ${config.versão}`, message.author.displayAvatarURL({ dynamic: true }))
                message.quote(embed)
                const add = new mod({
                    _id:id
                  }).save().catch(err => console.log(err))
            }
        })
    }
}
exports.help = {
    "name": "setperm",
    "aliases": ['addperm', 'mod', 'dev']
}