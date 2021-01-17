const Discord = require('discord.js')
const config = require('../../config.json')
const emoji = require('../../jsons/emojis.json')
const dev = require('../../mongodb/devperm.js')
const mod = require('../../mongodb/modperm.js')

exports.run = async (client, message, args) => {
    if(message.author.id !== '717766639260532826') return message.quote(`${emoji.nao} ${message.author}, esse comando só pode ser usado por meu dono`)
    if(!args[0]) return message.quote(`${emoji.nao} ${message.author}, escolha entre \`dev\` e \`mod\` usuário`)
    // Dev
    if(args[0] === 'dev') {
        const id = args[1]
        dev.findOneAndDelete({_id:id}, async (err, db) => {
            if(db) {
                const user = await client.users.fetch(id)
                const ja = new Discord.MessageEmbed()
                .setTitle(`SetPerm | ${client.user.username}`)
                .setDescription(`\`${user.tag}\` foi removido como desenvolvedor`)
                .setColor(config.color)
                .setFooter(`Comando Executado por ${message.author.tag} • Versão: ${config.versão}`, message.author.displayAvatarURL({ dynamic: true }))
                message.quote(ja)
            } if(!db) {
                const user = await client.users.fetch(id)
                const embed = new Discord.MessageEmbed()
                .setTitle(`SetPerm | ${client.user.username}`)
                .setDescription(`\`${user.tag}\` não é meu desenvolvedor`)
                .setColor(config.color)
                .setFooter(`Comando Executado por ${message.author.tag} • Versão: ${config.versão}`, message.author.displayAvatarURL({ dynamic: true }))
                message.quote(embed)
            }
        })
    }
    // Fim
    // Casp Seja Mod
    if(args[0] === 'mod') {
        const id = args[1]
        mod.findOneAndDelete({_id:id}, async (err, db) => {
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
                .setDescription(`\`${user.tag}\` não é meu moderador`)
                .setColor(config.color)
                .setFooter(`Comando Executado por ${message.author.tag} • Versão: ${config.versão}`, message.author.displayAvatarURL({ dynamic: true }))
                message.quote(embed)
            }
        })
    }
}
exports.help = {
    "name": "removeperm",
    "aliases": ['subperm', 'unmod', 'undev'],
    category: 'dev'
}