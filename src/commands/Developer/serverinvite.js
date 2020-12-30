const Discord = require("discord.js");

module.exports.run = async (client, message, args, prefix) =>{

        if(args[0]){
            let found = message.client.guilds.cache.get(args[0]);
            if(!found){
                found = message.client.guilds.cache.find((g) => g.id === args.join(" "));
                if(found){
                    guild = found;
                }
            }
        } else {
            return message.reply("o id do servidor é invalido");
        }

        if(guild){
            let tChannel = guild.channels.cache.find((ch) => ch.permissionsFor(ch.guild.me).has("CREATE_INSTANT_INVITE"));
            if(!tChannel){
                return message.reply("ocorreu um erro: (MissingPermissions)"); 
            }
            let invite = await tChannel.createInvite({ maxAge : "0" }).catch((err) => {
                return message.reply("ocorreu um erro!");
            });
            message.quote(invite.url);
        } else {
            return message.reply("não econtrei o servidor")
        }
    }
module.exports.help = {
    name: "serverinvite",
    aliases: ['getinvite', 'convite', 'servidor'],
    status: 'on'
}