const { MessageEmbed } = require("discord.js");
const Discord = require('discord.js');
const fetch = require('node-fetch');
const config = require('../config.json')

exports.run = async (client, message, args, prefix) => {
  
    let text = args.join(" ");

        if (!text) {
            return message.quote(`${message.author}, indique o que o clyde deve falar.`);
        }

        let m = await message.quote(`${message.author}, espere um pouco...`);
        try {
            let res = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=clyde&text=${text}`));
            let json = await res.json();
            let attachment = new Discord.MessageAttachment(json.message, "clyde.png");
            const clyde = new Discord.MessageEmbed()
            .setTitle('<:Bot:782673065867608104> | Clyde')
            .setImage(json.message)
            .setColor('ff0000')
            .setFooter(`Comando Executado por ${message.author.tag} • ${config.versão}`, message.author.displayAvatarURL({ dynamic: true, size: 2048 }))
            message.quote(clyde);
            m.delete({ timeout: 3000 });
        } catch (e) {
            m.edit(e.message);
        }
    
  }
exports.help = {
    name: "clyde",
    aliases: []
}