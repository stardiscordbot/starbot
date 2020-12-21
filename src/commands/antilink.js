const Discord = require('discord.js')
const emoji = require('../jsons/emojis.json');
const Antilink = require('../mongodb/antilink');
const config = require('../config.json');
const c = require('colors');

exports.run = async (client, message, args, prefix) => {
    // Caso o Antilink seja ligado
    if(args[0] == "on") {
        const confirmar = new Discord.MessageEmbed()
        .setTitle(`${emoji.correto} | AntiLink`)
        .setDescription(`Se deseja ativar o antilink reaja com ${emoji.correto}`)
        .setColor('GREEN')
        .setFooter(`Comando Executado por ${message.author.tag} • Versão: ${config.versão}`, message.author.displayAvatarURL({ dynamic: true, size: 2048 }))
        message.quote(confirmar).then(function (msg) {
            msg.react(":concluido:768507087268610079").then(r=>{
            msg.react(":error:768507066859126815"); 
        })

        const simFilter = (reaction, user) => reaction.emoji.name === 'concluido' && user.id === message.author.id;
        const naoFilter = (reaction, user) => reaction.emoji.name === 'error' && user.id === message.author.id;

        const sim = msg.createReactionCollector(simFilter, { time: 60000 });
        const nao = msg.createReactionCollector(naoFilter, { time: 60000 });
        // Caso Sim
        sim.on('collect', r1 => {
        msg.delete()
        Antilink.findOne({
            _id: message.guild.id
        }, async (err, anti) => {
            if(err) console.log((`[ERRO] - ${err}`));
            if(!anti) {
                const sucesso = new Discord.MessageEmbed()
                .setTitle('<:concluido:768507087268610079> | Sucesso')
                .setDescription('> O antilink foi ativado nesse servidor')
                .setColor('GREEN')
                .setFooter(`Comando Executado por ${message.author.tag} • Versão: ${config.versão}`, message.author.displayAvatarURL({ dynamic: true, size: 2048 }))
                message.quote(sucesso)
            } else {
                const erro = new Discord.MessageEmbed()
                  .setTitle('<:error:768507066859126815> | Erro')
                  .setDescription('> Já estou deletando links nesse servidor')
                  .setColor('RED')
                  .setFooter(`Comando Executado por ${message.author.tag} • Versão: ${config.versão}`, message.author.displayAvatarURL({ dynamic: true, size: 2048 }))
                message.quote(erro)
              }
              if(!anti) {
                const newdc = new Antilink({
                    _id: message.guild.id,
                });
                await newdc.save().catch(e => console.log(e));
        }})
            })
            // Caso Não
            nao.on('collect', r2 => {
                msg.delete()
                const sucesso = new Discord.MessageEmbed()
                .setTitle(`${emoji.correto} | Sucesso`)
                .setDescription(`> A operação foi cancelada com sucesso`)
                .setColor('GREEN')
                .setFooter(`Comando Executado por ${message.author.tag} • Versão: ${config.versão}`, message.author.displayAvatarURL({ dynamic: true, size: 2048 }))
                message.quote(sucesso)
            })
        });
        // Fim do Caso on
    }
        // Caso Off
        if(args[0] == "off") {
            const confirmar = new Discord.MessageEmbed()
        .setTitle(`${emoji.correto} | AntiLink`)
        .setDescription(`> Se deseja desativar o antilink reaja com ${emoji.correto}`)
        .setColor('GREEN')
        .setFooter(`Comando Executado por ${message.author.tag} • Versão: ${config.versão}`, message.author.displayAvatarURL({ dynamic: true, size: 2048 }))
        message.quote(confirmar).then(function (msg) {
            msg.react(":concluido:768507087268610079").then(r=>{
            msg.react(":error:768507066859126815"); 
        })
        const simFilter = (reaction, user) => reaction.emoji.name === 'concluido' && user.id === message.author.id;
        const naoFilter = (reaction, user) => reaction.emoji.name === 'error' && user.id === message.author.id;

        const sim = msg.createReactionCollector(simFilter, { time: 60000 });
        const nao = msg.createReactionCollector(naoFilter, { time: 60000 });
        // Caso Sim
        sim.on('collect', r1 => {
            msg.delete()
            Antilink.findOneAndDelete({
                _id: message.guild.id
            }, async (err, anti) => {
                if(anti) {
                  const dd = new Discord.MessageEmbed()
                    .setTitle('<:concluido:768507087268610079> | Sucesso')
                    .setDescription('> O AntiLink foi desativado nesse servidor')
                    .setColor('GREEN')
                    .setFooter(`Comando Executado por ${message.author.tag} • Versão: ${config.versão}`, message.author.displayAvatarURL({ dynamic: true, size: 2048 }))
                  message.quote(dd);
                } else {
                  const erro = new Discord.MessageEmbed()
                    .setTitle('<:error:768507066859126815> | Erro')
                    .setDescription('> O Antilink não está ativado nesse servidor')
                    .setColor('RED')
                    .setFooter(`Comando Executado por ${message.author.tag} • Versão: ${config.versão}`, message.author.displayAvatarURL({ dynamic: true, size: 2048 }))
                  message.quote(erro)
                }
            });
        })
        // Caso Não
        nao.on('collect', r2 => {
            msg.delete()
            const sucesso = new Discord.MessageEmbed()
            .setTitle(`${emoji.correto} | Sucesso`)
            .setDescription(`> A operação foi cancelada com sucesso`)
            .setColor('GREEN')
            message.quote(sucesso)
        })
    })
        }
        // Fim do caso off
}
exports.help = {
    name: 'antilink',
    aliases: ['antiinvite'],
    status: 'on',
}