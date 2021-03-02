module.exports = class VarporwaveCommand {
  constructor(){
    return {
      permissoes: {
        membro: ['ADMINISTRATOR'], //Permissoes que o usuario necessita
        bot: ['ADMINISTRATOR'], //Permissoes que o bot necessita
        dono: false //Se apenas nos devs podem usar o comando
      },
      pt: {
        nome: 'backup',
        categoria: '🔨 • Moderação',
        desc: 'Gerencia backups em seu servidor'
      },
      en: {
        nome: 'backup',
        categoria: '🔨 • Moderation',
        desc: 'Manages backups on your server'
      },
    aliases: ['back', 'serverbackup'],
    run: this.run
    }
  }
  
  async run(client, message, args, prefixoCerto, idioma) {
    const backup = require("discord-backup");

    const embed = new (require('discord.js')).MessageEmbed()
    .setTitle(`${client.user.username} | Backup`)
    .setDescription(`🔁 ${idioma.backup.info}\n\n${idioma.backup.args}`)

    if(!args[0]) return message.quote(embed)

    if(args[0] === 'create' || 'criar') {
       backup.create(message.guild, {
            jsonBeautify: true
        }).then((backupData) => {

            message.author.send(`:white_check_mark: ${message.author} **|** ${idioma.backup.createdUser.replace('%p', prefixoCerto).replace('%id', backupData.id)}`).catch(err => {
              message.quote(`:white_check_mark: ${message.author} **|** ${idioma.backup.createdUser.replace('%p', prefixoCerto).replace('%id', backupData.id)}`)
            })

            message.quote(`:white_check_mark: ${message.author} **|** ${idioma.backup.created}`);
        });
    }

    if(args[0] === 'load' || 'carregar') {
      let backupID = args[1];
        if(!backupID){
            return message.channel.send(`:x: ${message.author} **|** ${idioma.backup.idError}`);
        }
        backup.fetch(backupID).then(async () => {
            message.channel.send(`:warning: ${message.author} **|** ${idioma.backup.confirm}`);
                await message.channel.awaitMessages(m => (m.author.id === message.author.id) && (m.content === "confirm" || "confirmar"), {
                    max: 1,
                    time: 30000,
                    errors: ["time"]
                }).catch((err) => {
                    return message.channel.send(`:x: | ${idioma.backup.time}`);
                });
                message.author.send(":white_check_mark: | Start loading the backup!");
                backup.load(backupID, message.guild).then(() => {
                    backup.remove(backupID);
                }).catch((err) => {
                    return message.author.send(":x: | Sorry, an error occurred... Please check that I have administrator permissions!");
                });
        }).catch((err) => {
            console.log(err);
            return message.channel.send(":x: | No backup found for `"+backupID+"`!");
        });
    }

  }
}

//ADG