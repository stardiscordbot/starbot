const Discord = require('discord.js');
const config = require('../../config.json');
const economy = require('../../mongodb/economy.js')
const emoji = require('../../jsons/emojis.json');
const dev = require('../../mongodb/devperm.js');
  
module.exports.run = async (client, message, args, prefix) => {
        // Caso não tenha perm
        if(message.author.id !== '717766639260532826') return message.quote(`${emoji.nao} ${message.author}, você não tem permissão para executar este comando!`)
        // Se o User for dev
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author;
        if (!user) {
         message.quote(`${emoji.nao} ${message.author}, defina um usuário!`);
        } else {
        if (isNaN(args[1])) {message.reply(`${emoji.nao} ${message.author}, eu preciso de uma quantidade para poder adicionar o dinheiro`)} else {
        let amount = args[1];
    
            economy.findOne({ User: user.id },async(err, data)=>{
              if(err) console.log(err)
    
              if(!data){
                  let newEconomy = new economy({
                      User: user.id,
                      economy: amount,
                      Bank: 0
                  })
                  newEconomy.save(); 
              let embed1 = new MessageEmbed()
                  .setTitle(`${client.user.username} | AddMoney`)
                  .setColor("00FF00")
                  .setDescription(`${emoji.sim} Adicionei: \`${amount}\` ao usuário \`${user.tag}\``);
                  message.channel.send(embed1)
    
               } else {
                  data.Money = data.Money + amount;
                  data.save().catch(err => console.log(err))
                  let embed2 = new MessageEmbed()
                  .setTitle(`${client.user.username} | AddMoney`)
                  .setColor("00FF00")
                  .setDescription(`${emoji.sim} Adicionei: \`${amount}\` ao usuário \`${user.tag}\``);
                  message.channel.send(embed2)
              }
          })
        };
    
    }
}

exports.help = {
    name: 'addeconomy',
    aliases: ['addcoins', 'adddreams', 'giveeconomy'],
    status: 'on',
    category: 'economy'
}