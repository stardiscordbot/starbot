// Puxando coisinhas Legais :)
require('mongoose')
const Discord = require('discord.js');
const config = require('../config.json');
const emoji = require('../jsons/emojis.json');
const Money = require("../mongodb/money.js");
const db = require("../mongodb/blacklist.js");

exports.run = async (client, message, args, prefix) => {
    const embed = new Discord.MessageEmbed()
    .setTitle(`Resetar Dados | ${client.user.username}`)
    .setDescription(`Olá, ${message.author} aparentemente você fez uma solicitação para deletar suas informações do meu banco de dados, bom, lembre-se que isso é uma ação irreversivel e para voltar com tudo que tinha você terá que começar do __**zero**__, caso tenha consciência disso reaja com ${emoji.correto} para realizar o processo de exclusão de dados, **você será banido durante o processo de exclusão de dados para evitar que ocorram bugs durante esse processo.**`)
    .setColor(config.color)
    .setFooter(`Comando Executado por ${message.author.tag} • Versão: ${config.versão}`, message.author.displayAvatarURL({ dynamic: true, size: 2048 }))
    message.channel.send(embed).then(msg=> {
        msg.react('768507087268610079')
        const collectfilter = (reaction, user) => reaction.emoji.name === 'concluido' && user.id === message.author.id;
        const coletor = msg.createReactionCollector(collectfilter, { time: 60000 });

    coletor.on('collect', r => { 
        r.remove(client.user.id)
        r.remove(message.author.id)
        const deletando = new Discord.MessageEmbed()
        .setTitle(`Resetar Dados | ${client.user.username}`)
        .setDescription(`Deletando dados...`)
        .setColor(config.color)
        .setFooter(`Comando Executado por ${message.author.tag} • Versão: ${config.versão}`, message.author.displayAvatarURL({ dynamic: true, size: 2048 }))
       msg.edit(deletando);
       // Banindo o User
       let motivo = 'Processo de Exclusão de Dados'
       new db ({
        _id:message.author.id,
        autorTag:message.author.tag,
        motivo:motivo
      }).save().catch(err => console.log(err))
       // Deletando Dinheiro
       Money.findOneAndDelete({
           userID:message.author.id
       }, async (err, money) => {
           const sucesso = new Discord.MessageEmbed()
           .setTitle(`Resetar Dados | ${client.user.username}`)
           .setDescription(`Seus dados foram deletados com sucesso!`)
           .setColor(config.color)
           .setFooter(`Comando Executado por ${message.author.tag} • Versão: ${config.versão}`, message.author.displayAvatarURL({ dynamic: true, size: 2048 }))
            msg.edit(sucesso)
            db.findOneAndDelete({
                _id:message.author.id
            }, async (err, money) => {
                console.log('[SUCESSO] - PROCESSO DE EXCLUSÃO DE DADOS'.america)
            })
        })
        // Fim
       })
     })
    }
exports.help = {
    "name": "removerconta",
    "aliases": ["resetarconta", "removerconta", "terminarconta", "resetardados", "removerdados"],
    "status": "on"
}