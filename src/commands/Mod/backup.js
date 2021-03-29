module.exports = class ExemploCommand {
    constructor(){
      return {
        permissoes: {
          membro: [], //Permissoes que o usuario necessita
          bot: ['ADMINISTRATOR'], //Permissoes que o bot necessita
          dono: false //Se apenas nos devs podem usar o comando
        },
        pt: {
          nome: 'backup',
          categoria: '🔨 • Moderação',
          desc: 'Descrição'
        },
        en: {
          nome: 'backup',
          categoria: '🔨 • Moderation',
          desc: 'Description'
        },
      aliases: ['backups'],
      run: this.run
      }
    }
    
    async run(client, message, args, prefixo, idioma) {
        const backup = require("../../../starnpms/discord-backup/lib/index");

        if(message.author.id !== message.guild.ownerID) return message.quote(`Só dono do sv mermão`)

        const embed = new (require("discord.js")).MessageEmbed()
        .setTitle(`☁️ Backup | ${client.user.username}`)
        .addField(`[1] Create:`, `Cria um backup desse servidor, \`s!backup create\``)
        .setColor("BLUE")
        if(!args[0]) return message.quote(embed)

        if(args[0].toLowerCase == "create") {
            backup.create(message.guild, {
                jsonBeautify: true
            }).then((backupData) => {
                message.quote("The backup has been created! To load it, type this command on the server of your choice: `"+settings.prefix+"load "+backupData.id+"`!");
                message.quote(":white_check_mark: Backup successfully created. The backup ID was sent in dm!");
            });
        }
    }
  }
  
  //ADG