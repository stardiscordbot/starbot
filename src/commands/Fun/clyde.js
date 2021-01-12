const Discord = require('discord.js');
const emoji = require('../../jsons/emojis.json')
const fetch = require('node-fetch');

exports.run = async (client, message, args, prefix) => {
  
    let text = args.join(" ");

        if (!text) {
            return message.quote(`${emoji.nao} ${message.author}, Eu preciso que você especifique o texto.`);
        }
            let res = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=clyde&text=${text}`));
            let json = await res.json();
            let attachment = new Discord.MessageAttachment(json.message, "clyde.png");
            message.quote(attachment);
}
exports.help = {
    name: "clyde",
    aliases: [],
    category: 'div'
}