const Discord = require('discord.js'); 

exports.run = (client, message, args) => {
   message.channel.send('**Removi todos os banimentos do servidor!** ')


  message.guild.fetchBans().then(bans => {
      bans.forEach(user => {
        message.guild.members.unban(user)
      });
    });
};

exports.help = {
  name: 'unbanall',
  aliases: ['uball'],
  usage: 'unbanall '
};