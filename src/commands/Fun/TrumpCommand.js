const { MessageEmbed } = require("discord.js");
const Discord = require('discord.js');
const fetch = require('node-fetch');
const config = require('../../config.json')

exports.run = async (client, message, args, prefix) => {
  
    let text = args.join(" ");

        if (!text) {
            return message.reply("indique o tweet.");
        }

        let m = await message.reply("espere um pouco...");
        try {
            let res = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=trumptweet&text=${text}`));
            let json = await res.json();
            let attachment = new Discord.MessageAttachment(json.message, "clyde.png");

            const trump = new Discord.MessageEmbed()
            .setTitle('<:db_twitter:782665233114202182> | Trump Tweet')
            .setColor('ff0000')
            .setImage(json.message)
            .setFooter(`Comando Executado por ${message.author.tag} • Versão: ${config.versão}`, message.author.displayAvatarURL({ dynamic: true, size: 2048 }))

            message.quote(trump);
            m.delete({ timeout: 3000 });
        } catch (e) {
            m.edit(e.message);
        }
    
  }
exports.help = {
    name: "trumptweet",
    aliases: ['trump'],
    status: 'on',
    category: 'div'
}