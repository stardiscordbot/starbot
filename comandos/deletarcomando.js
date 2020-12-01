const Discord = require('discord.js');
const Deletar = require('../mongodb/dc.js');
const mongoose = require("mongoose");

exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_GUILD")) return message.reply("você não tem permissão para usar esse comando, você necessita da permissão `Gerenciar Servidor`, contate algum admininstrador e tente novamente");
    if(!args[0]) return message.reply('você precisa escolher entre `on` e `off`')
    // Se off
    if(args[0] == "off") {
        Deletar.findOneAndDelete({
            _id: message.guild.id
        }, async (err, deletar) => {
            if(deletar) {
              const dd = new Discord.MessageEmbed()
                .setTitle('<:concluido:768507087268610079> | Sucesso')
                .setDescription('> Não irei mais deletar todos os comandos executados nesse servidor')
                .setColor('GREEN')
              message.channel.send(dd);
            } else {
              const erro = new Discord.MessageEmbed()
                .setTitle('<:error:768507066859126815> | Erro')
                .setDescription('> Não estou deletando comandos nesse servidor')
                .setColor('RED')
              message.channel.send(erro)
            }
        });
    };
    // Se on
    if(args[0] == "on") {
        Deletar.findOne({
            _id: message.guild.id
        }, async (err, deletar) => {
            if(err) console.log(err);
            if(!deletar) {
                const sucesso = new Discord.MessageEmbed()
                .setTitle('<:concluido:768507087268610079> | Sucesso')
                .setDescription('> Irei deletar todos os comandos executados nesse servidor')
                .setColor('GREEN')
                message.channel.send(sucesso)
            } else {
                const erro = new Discord.MessageEmbed()
                  .setTitle('<:error:768507066859126815> | Erro')
                  .setDescription('> Já estou deletando comandos nesse servidor')
                  .setColor('RED')
                message.channel.send(erro)
              }
            if(!deletar) {
                const newdc = new Deletar({
                    _id: message.guild.id,
                });
                await newdc.save().catch(e => console.log(e));
        }
    });
}}
exports.help = {
    name: 'deletarcomando',
    aliases: ['dc', 'commanddelete', 'deletecommand']
}