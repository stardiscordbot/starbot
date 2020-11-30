const { MessageEmbed } = require("discord.js");   
const config = require('../config.json');
const { Menu } = require('discord.js-menu');

exports.run = (client, message, args) => {

    let helpMenu = new Menu(message.channel, message.author.id, [
        // Each object in this array is a unique page.
        {
            // A page object consists of a name, used as a destination by reactions...
            name: 'main',
            // A MessageEmbed to actually send in chat, and...
            content: new MessageEmbed({
                title: 'Ajuda | Star:tm:',
                color: config.color,
                description: `Olá, ${message.author} meu nome é Star:tm:, bem vindo ao meu ajuda\n\nA Star tem foco em Comandos de diversão, mas também tenho funções de moderação, ultilidades e (em um futuro proximo) economia\n\n**<a:wumpusgift:760827461217812481> | Lista de Comandos**\nhttps://starbot-website.yadg.repl.co/comandos\n**<:wumpus:754739856436887712> | Tem alguma dúvida? Pergunte em meu Suporte!**\nhttps://starbot-website.yadg.repl.co/redirect/suporte`
            }),
            // A set of reactions with destination names attached.
            // Note there's also special destination names (read below)
            reactions: {
                '⏹': 'delete',
                '▶': 'extra'
            }
        },
        {
            name: 'extra',
            content: new MessageEmbed({
                title: 'Ajuda | Star:tm:',
                color: config.color,
                description: 'Isso aqui é o menu que é exibido no discord caso você esteja com preguiça de ir ao website'
            }),
            reactions: {
                '◀': 'first'
            }
        }
        // The last parameter is the number of milliseconds you want the menu to collect reactions for each page before it stops to save resources
        // The timer is reset when a user interacts with the menu.
        // This is optional, and defaults to 180000 (3 minutes).
    ], 300000)
    // Run Menu.start() when you're ready to send the menu in chat.
    // Once sent, the menu will automatically handle everything else.
    helpMenu.start()
}
exports.help = { 
  name: 'ajuda2', 
  aliases: ['help2', 'comandos2', 'commands2', 'cmds2'],
  status: 'off'
}