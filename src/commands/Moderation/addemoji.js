const Discord = require('discord.js')
const emoji = require('../../jsons/emojis.json')

exports.run = async (client, message, args, prefix) => {
    if (!message.member.hasPermission("MANAGE_EMOJIS")) return message.qutoe(`${emoji.nao} ${message.author}, Você não tem permissão para usar este comando!`); 
    if (!message.guild.me.hasPermission("MANAGE_EMOJIS")) return message.qutoe(`${emoji.nao} ${message.author}, Eu não tenho permissão para executar este comando!`);
    if (!args[0]) return message.quote(`${emoji.nao} ${message.author}, eu preciso do nome do emoji para adicionar, ultilize: \`${prefix}addemoji <nome> <url>\``);
    if(!args[1]) {
        const emoji = args[0];
    if (!emoji) return message.quote(`${emoji.nao} ${message.author}, eu preciso do nome do emoji para adicionar, ultilize: \`${prefix}addemoji <nome> <url>\``);

    let customemoji = Discord.Util.parseEmoji(emoji);

    if (customemoji.id) {
        const Link = `https://cdn.discordapp.com/emojis/${customemoji.id}.${
            customemoji.animated ? 'gif' : 'png'
        }`;
        const name = args.slice(1).join(' ');
        message.guild.emojis.create(`${Link}`, `${name || `${customemoji.name}`}`);
        message.quote(`${emoji} **|** Emoji adicionado com sucesso.`);
        }
    }
    try {
    message.guild.emojis.create(args[1], args[0]).then(emoji => {
      message.quote(`${emoji} **|** Emoji adicionado com sucesso.`);
    });
  } catch(err) {
    message.quote(`\`\`\`js\n${err}\n\`\`\``);
}
}
exports.help = {
    name: 'addemoji',
    aliases: ['adicionaremoji']
}