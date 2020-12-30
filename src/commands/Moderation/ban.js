const emoji = require('../../jsons/emojis.json')
const config = require('../../config.json')
const Discord = require('discord.js')

exports.run = async (client, message, args, prefix) => {
    // Caso o user não tenha perm
    if(!message.guild.me.permissions.has("BAN_MEMBERS")) {
        return message.quote(`${emoji.nao} ${message.author}, Eu não tenho permissão para executar este comando!`)
      }
      if (!message.member.permissions.has("BAN_MEMBERS"))
        return message.quote(`${emoji.nao} ${message.author}, Você não tem permissão para usar este comando!`);
    // Caso Não tenha nada
    if(!args[0]) message.quote(`${emoji.nao} ${message.author}, Eu preciso da \`Menção ou ID\` do usuário para banir.`)
    // Procurando o User
    if(!message.mentions.members.first()) {
        member = await client.users.fetch(args[0]).then(info => info).catch(() => { return; });
    } else member = message.mentions.users.first();
    // Banindo
    const awaitembed = new Discord.MessageEmbed()
    .setTitle(`Confirmar Punição | ${client.user.username}`)
    .setDescription(`${message.author}, se você deseja confirmar a punição de: \`${member.tag}\` reaja com ${emoji.sim}`)
    .setColor(config.color)
    message.quote(awaitembed).then(msg => {
        msg.react('754692730546028615')
        const confirmfilter = (reaction, user) => reaction.emoji.name === 'sim' && user.id === message.author.id;
        const confirm = msg.createReactionCollector(confirmfilter, { time: 30000 });
        confirm.on('collect', r1 => {
            msg.delete()
            r1.users.remove(message.author.id)
            r1.users.remove(client.user.id)
            // Motivo
    let banReason = args.splice(1).join(" ");
    if (!banReason) {
    banReason = "Não Definido"
    }
    message.guild.members.ban(member, { reason: `Punido por: ${message.author.tag} - Motivo: ${banReason}`, }).catch(err => {
        message.quote(`${message.author.tag}, eu não posso banir esse usuário.\nErro: ${err}`);
      });
    // Embed de sucesso
    const sucesso = new Discord.MessageEmbed()
    .setTitle(`${emoji.correto} | Banido`)
    .setDescription(`O Usuário \`${member.tag} (${member.id})\` foi banido!`)
    .setColor(config.color)
    message.quote(sucesso)
        }) 
    })
}
exports.help = {
    name: 'ban',
    aliases: ['banir', 'hackban', 'forceban'],
    category: 'mod'
}