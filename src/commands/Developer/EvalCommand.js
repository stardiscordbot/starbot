const Discord = require('discord.js');
const config = require('../../config.json');
const dev = require('../../mongodb/devperm.js')
  
module.exports.run = async (client, message, args, prefix) => {
    dev.findOne({_id:message.author.id}, async (err, db) => {
        // Caso não tenha perm
        if(!db) {
            message.quote(`<a:nao:753735889783357560> ${message.author}, você não tem permissão para usar meu eval`)
        }
        // Se o User for dev
        if(db) {
            try {
            if(!args.join(' ')) return message.quote(`${emoji.nao} ${message.author}, eu preciso de um código pra evaluar`)
            let code = await eval(args.join(" "));
            if (typeof code !== 'string') code = await require('util').inspect(code, { depth: 0 });
            let embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .addField('📩 Entrada', `\`\`\`js\n${args.join(" ")}\`\`\``)
            .addField('🚩 Saída', `\`\`\`js\n${code.slice(0, 1010)}\n\`\`\``)
            if(code.length > 1010) embed.addField('🚩 Continuação do Resultado', `\`\`\`js\n${code.slice(1010, 2020)}\n\`\`\``)
            message.quote({embed})
        } catch(err) {
            message.quote(`\`\`\`js\n${err}\n\`\`\``);
        }
    }   
        // Fim
        })
    }
exports.help = {
    name: 'eval',
    aliases: ['evaluate', 'ev', 'e'],
    status: 'on',
    category: 'dev'
}