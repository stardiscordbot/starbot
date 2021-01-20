const Discord = require('discord.js')
const emoji = require('../../jsons/emojis.json')
const user2 = require('../../mongodb/user.js')

exports.run = async (client, message, args) => {
    const user = args[0] ? message.mentions.users.first() ||  client.users.cache.find(a => a.username === args.slice(0).join(' ')) || await client.users.fetch(args[0]).catch(_ => message.author) : message.author
    user2.findOne({id:user.id}, (err, db) => {
        if(db) {
            if(!db.marry) db.marry = 'Ninguém, mais solitário que meu coração...'
            const perfil = new Discord.MessageEmbed()
            .setAuthor(`${user.username}`, user.displayAvatarURL({dynamic: true}))
            .setThumbnail(user.displayAvatarURL({dynamic: true}))
            .setImage(`${db.perfil}`)
            .addField(`Casado Com:`, `\`\`\`${db.marry}\`\`\``)
            .addField(`Sobre Mim:`, `\`\`\`${db.sobre}\`\`\``)
            .setColor('ff00c2')
            message.quote(perfil)
        }
        if(!db) {
            message.quote(`${emoji.nao} ${message.author}, O Usuário \`${user.username}\` não possui uma conta em meu banco de dados`)
        }
    })
}
exports.help = {
    name: 'perfil',
    aliases: [],
    category: 'others'
}