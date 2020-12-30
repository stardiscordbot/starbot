const Discord = require('discord.js')
const config = require('../../config.json')
const emoji = require('../../jsons/emojis.json')

exports.run = (client, message, args, prefix) => {
    if(!message.member.hasPermission('KICK_MEMBERS')) return message.quote(`${emoji.nao} ${message.author}, você não tem permissão para usar este comando.`)
    if(!message.guild.me.hasPermission('KICK_MEMBERS')) return message.quote(`${emoji.nao} ${message.author}, eu não tenho permissão para executar este comando`)
    if(!args[0]) return message.quote(`${emoji.nao} ${message.author}, eu preciso do \`ID/Menção\` do usuário`)

    const motivo = args.splice(1).join(" ")
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

    const tag = member.tag
    const id = member.id

    const awaitembed = new Discord.MessageEmbed()
    .setTitle(`Confirmar Punição | ${client.user.username}`)
    .setDescription(`${message.author}, se você deseja confirmar a punição de: \`${tag}\` reaja com ${emoji.sim}`)
    .setColor(config.color)
    message.quote(awaitembed).then(msg => {
    msg.react('754692730546028615')
        const confirmfilter = (reaction, user) => reaction.emoji.name === 'sim' && user.id === message.author.id;
        const confirm = msg.createReactionCollector(confirmfilter, { time: 30000 });
        confirm.on('collect', r1 => {
            msg.delete()
            r1.users.remove(message.author.id)
            r1.users.remove(client.user.id)
    if(!motivo) motivo = 'Não Definido'
    member.kick({
        reason: `Punido por: ${message.author.tag} - Motivo: ${motivo}`
            })
            const sucesso = new Discord.MessageEmbed()
            .setTitle(`${emoji.correto} | Banido`)
            .setDescription(`O Usuário \`${tag} (${id})\` foi expulso!`)
            .setColor(config.color)
            message.quote(sucesso)
        })
    })
}
exports.help = {
    name: 'kick',
    aliases: ['expulsar'],
    category: 'mod'
}