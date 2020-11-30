const Discord = require("discord.js"); //Conexão com a livraria discord.js

exports.run = async (client, message, args) => { //estrutura básica de criação de um comando

  
 let avatar = message.guild.iconURL({ dynamic: true, format: 'png', size: 1024 });
  
  let embed = new Discord.MessageEmbed() // Declarando a criação do Embed
    .setColor("RANDOM") // Cor em hexadecimal
    .setAuthor(`🖼️ ${message.guild.name}`) // Título do embed 
    .setDescription(`[Clique Aqui](${avatar}) para baixar a imagem!`)
    .setImage(avatar) // Aqui mostramos seu rostinho lindo
 await message.channel.send(embed); //Enviando o embed no chat

}; // cabou!
exports.help = {
    name: 'servericon',
    aliases: ['sic']
}