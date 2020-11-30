const Discord = require('discord.js');
const config = require('../config.json');

  
module.exports.run = async (client, message, args) => {
        try {
            if (!config.dev.some(a => message.author.id === a)) return message.channel.send('Apenas desenvolvedores do bot podem utilizar este comando!')
            if(!args.join(' ')) return message.channel.send('Escreva o código')
            let code = await eval(args.join(" "));
            if (typeof code !== 'string') code = await require('util').inspect(code, { depth: 0 });
            let embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .addField('📩 Entrada', `\`\`\`js\n${args.join(" ")}\`\`\``)
            .addField('🚩 Saída', `\`\`\`js\n${code.slice(0, 1010)}\n\`\`\``)
            if(code.length > 1010) embed.addField('🚩 Continuação do Resultado', `\`\`\`js\n${code.slice(1010, 2020)}\n\`\`\``)
            message.reply({embed})
        } catch(err) {
            message.channel.send(`\`\`\`js\n${err}\n\`\`\``);
        }
}
exports.help = {
    name: 'eval',
    aliases: ['evaluate', 'ev', 'e'],
    status: 'on'
}