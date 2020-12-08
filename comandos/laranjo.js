// Adapte para seu bot, isso é a base! By: Rafa
const jimp = require("jimp")
const Discord = require('discord.js')

module.exports.run = async (client, message, args, prefix) => {
        let img = jimp.read("https://media.discordapp.net/attachments/510871777728135201/777618213331796029/laranjo-meme-star.jpg?width=627&height=452")
        if (!args[0]) return message.reply("indique que o laranjo deve falar.")
        if(args[0].length > 50) {
            return message.quote(`${message.author}, você ultrapassou o limite de 50 caracteres.`)
            }
        let m = await message.quote(`${message.author}, espere um pouco...`);
        img.then(image => {
            jimp.loadFont(jimp.FONT_SANS_32_BLACK).then(font => {
                image.resize(685, 494)
                image.print(font, 20, 30, args.join(" "), 600)
                image.getBuffer(jimp.MIME_PNG, (err, i) => {
                    const efe = new Discord.MessageEmbed()
                .setTitle('<:stonks:782669448846639125> | Stonks')
                .setImage({files: [{ attachment: i, name: "laranjo.png"}]})
                .setColor('ff0000')
                    message.quote(`>>> **<:Laranja:782671789569474610> | Laranjo**`, {files: [{ attachment: i, name: "laranjo.png"}]})
                    m.delete({ timeout: 3000 });
                })
            })
        })
    }
    exports.help = {
    name: 'laranjo',
    aliases: [ ]
}