const Discord = require("discord.js");   
const config = require('../config.json');
const backup = require('../../npms/discord-backup/lib/index.js')
const pr = require('../mongodb/prefix')

exports.run = (client, message, args, prefix) => {

  pr.findOne({name: "prefix", preid: message.guild.id}).then(res => {
    let prefix = res ? res.prefix : config.prefix;
    
    if(!message.guild.me.permissions.has("ADMINISTRATOR")) {
        const erro = new Discord.MessageEmbed()
        .setTitle('<:db_download:782290025458696192> | Backups')
        .setDescription(`${message.author} eu necessito da permissão admininstrador para criar backups`)
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 2048 }))
        .setColor(config.color)
        .setFooter(`Comando Executado por ${message.author.tag} • Versão: ${config.versão}`, message.author.displayAvatarURL({ dynamic: true, size: 2048 }))
        return message.quote(erro)
      }

    const comando = new Discord.MessageEmbed()
    .setTitle('<:db_download:782290025458696192> | Backups')
    .setDescription(`\`${prefix}backup create - Cria um Backup\n${prefix}backup load - Carrega um backup\n${prefix}backup info - Informações de Algum Backup\``)
    .setFooter(`Comando Executado por ${message.author.tag} • Versão: ${config.versão}`, message.author.displayAvatarURL({ dynamic: true, size: 2048 }))
    .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 2048 }))
    .setColor(config.color)

    if(!args[0]) message.quote(comando)

    if(args[0] == 'create') {
      if(!message.member.hasPermission("ADMINISTRATOR")){
        return message.quote(":x: | Você precisa da permissão de Admininstrador para criar backup's!");
    }
    backup.create(message.guild, {
        jsonBeautify: true
    }).then((backupData) => {
        const sucesso = new Discord.MessageEmbed()
        .setTitle('<:db_download:782290025458696192> | Sucesso')
        .setDescription(`Seu backup foi criado!`)
        .addField(`ID do Backup: ${backupData.id}`, `Para carregar ultilize \`${prefix}backup load <ID>\``)
        .setColor(config.color)
        .setFooter(`Comando Executado por ${message.author.tag} • Versão: ${config.versão}`, message.author.displayAvatarURL({ dynamic: true, size: 2048 }))

        const criado = new Discord.MessageEmbed()
        .setTitle('<:db_download:782290025458696192> | Sucesso')
        .setDescription(`Seu backup foi criado, e as informações mandadas na dm`)
        .setColor(config.color)
        .setFooter(`Comando Executado por ${message.author.tag} • Versão: ${config.versão}`, message.author.displayAvatarURL({ dynamic: true, size: 2048 }))
        message.author.send(sucesso);
        message.quote(criado);
    });
    }

    if(args[0] == 'load') {
      if(!message.member.hasPermission("ADMINISTRATOR")){
        return message.quote(":x: | Você precisa da permissão de Admininstrador para carregar backup's!");
    }
    let backupID = args[1];
    if(!backupID){
        return message.quote(":x: | Eu preciso do id do backup!");
    }
    backup.fetch(backupID).then(async () => {
        message.quote(":warning: | Quando o backup for carregado, todos os canais, funções, etc. serão substituídos! Digite `confirmar` para confirmar!");
            await message.channel.awaitMessages(m => (m.author.id === message.author.id) && (m.content === "confirmar"), {
                max: 1,
                time: 20000,
                errors: ["time"]
            }).catch((err) => {
                return message.quote(":x: | O Tempo acabou Backup Cancelado!");
            });
            const carregando = new Discord.MessageEmbed()
            .setTitle('<:db_download:782290025458696192> | Sucesso')
            .setDescription('Estou Carregando o backup!')
            .setColor(config.color)
            .setFooter(`Comando Executado por ${message.author.tag} • Versão: ${config.versão}`, message.author.displayAvatarURL({ dynamic: true, size: 2048 }))
            message.author.send(carregando);
            backup.load(backupID, message.guild).then(() => {
                backup.remove(backupID);
            }).catch((err) => {
                return message.author.send(":x: | Desculpe, ocorreu um erro ... Verifique se tenho permissões de administrador!");
            });
    }).catch((err) => {
        console.log(err);
        return message.quote(`:x: | Nenhum backup encontrado para \`${backupID}\`!`);
    });
    }

    if(args[0] == 'info') {
      let backupID = args[1];
        if(!backupID){
            return message.quote(":x: | Eu preciso do id do backup!");
        }
        backup.fetch(backupID).then((backupInfos) => {
            const date = new Date(backupInfos.data.createdTimestamp);
            const yyyy = date.getFullYear().toString(), mm = (date.getMonth()+1).toString(), dd = date.getDate().toString();
            const formatedDate = `${yyyy}/${(mm[1]?mm:"0"+mm[0])}/${(dd[1]?dd:"0"+dd[0])}`;
            let embed = new Discord.MessageEmbed()
                .setTitle("<:db_download:782290025458696192> | Informações do Backup")
                .addField("ID do Backup", backupInfos.id, false)
                .addField("ID do Servidor", backupInfos.data.guildID, false)
                .addField("Tamanho", `${backupInfos.size} mb`, false)
                .addField("Criado dia", formatedDate, false)
                .setFooter(`Comando Executado por ${message.author.tag} • Versão: ${config.versão}`, message.author.displayAvatarURL({ dynamic: true, size: 2048 }))
                .setColor(config.color);
            message.quote(embed);
        }).catch((err) => {
            return message.quote(`:x: | Nenhum backup encontrado para \`${backupID}\`!`);
        });
    }

})
}
exports.help = { 
  name: 'backup', 
  aliases: [],
  status: 'on'
}