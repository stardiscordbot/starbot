const { MessageEmbed } = require("discord.js");
const Discord = require('discord.js');
const fetch = require('node-fetch');
const config = require('../../config.json')

exports.run = async (client, message, args, prefix) => {
  
    let text = args.join(" ");

        if (!text) {
            return message.quote(`${message.author}, indique o changemymind.`);
        }
    if (message.length > 4) {
return message.quote(`${message.author}, sua mensagem é muito longa`)}
        let m = await message.quote(`${message.author}, espere um pouco...`);
        try {
            let res = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=changemymind&text=${text}`));
            let json = await res.json();
            let attachment = new Discord.MessageAttachment(json.message, "cmm.png");
            const cmm = new Discord.MessageEmbed()
            .setTitle('<:pepeCafe:782675737600852029> | ChangeMyMind')
            .setColor('ff0000')
            .setImage(json.message)
            .setFooter(`Comando Executado por ${message.author.tag} • ${config.versão}`, message.author.displayAvatarURL({ dynamic: true, size: 2048 }))
            message.quote(cmm);
            m.delete({ timeout: 3000 });
        } catch (e) {
            m.edit(e.message);
        }
    
  }
  exports.help = {
    name: "changemymind",
    aliases: ['cmm'],
    status: 'on',
    category: 'div'
}