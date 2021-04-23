module.exports = class BackupCommand {
    constructor(){
      return {
        permissoes: {
          membro: [], //Permissoes que o usuario necessita
          bot: ['ADMINISTRATOR'], //Permissoes que o bot necessita
          dono: true //Se apenas nos devs podem usar o comando
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
    
    async run(client, message, args, prefixoCerto, idioma) {
        const backup = require("../../../starnpms/discord-backup/lib/index");

        if(message.author.id !== message.guild.ownerID) return message.quote(`Só dono do sv mermão`)

        const embed = new (require("discord.js")).MessageEmbed()
        .setTitle(`☁️ Backup | ${client.user.username}`)
        .addField(`[1] Create:`, `Cria um backup desse servidor, \`s!backup create\``)
        .setColor("BLUE")
        if(!args[0]) return message.quote(embed)

        if(args[0].toLowerCase() == "create") {
          if(message.author.id !== message.guild.ownerID) return message.quote(`Só dono do sv mermão`)
          message.quote(`⏰ ${message.author} **|** ${idioma.backup.criando}`).then(m2 => {
          	message.channel.startTyping()
          backup.create(message.guild, {
            jsonBeautify: true
          }).then((backupData) => {
            let sucesso = new (require("discord.js")).MessageEmbed()
            .setTitle(`☁️ Backup | ${client.user.username}`)
            .setDescription(`Seu backup foi criado!\n\n❯ ${prefixoCerto}backup load ${backupData.id}`)
            .setColor("BLUE")
            let criado = new (require("discord.js")).MessageEmbed()
            .setTitle(`☁️ Backup | ${client.user.username}`)
            .setDescription(`Seu backup foi criado, e as informações mandadas em seu direct`)
            .setColor("BLUE")
            message.quote(criado).then(m => {
              message.channel.stopTyping()
            message.author.send(sucesso).catch((e) => {
              m.delete()
              message.quote(sucesso)
            })
            })
          })
          });

          if(args[0].toLowerCase() == "create") {
            
          }

        }
    }
  }
  
  //ADG