const { create, all } = require('mathjs'); //npm i mathjs
const cooldowns = {}
const ms = require("ms")
const config = require('../config.json');
const { MessageEmbed } = require('discord.js');
module.exports.run = async(client, message, args) => {
if (!args.length) return message.reply(`use: ${config.prefix}calc <calculo>`);

const math = create(all);
const limitedEvaluate = math.evaluate;

math.import({
    import: function () { throw new Error('A fun��o import est� desativada') },
    createUnit: function () { throw new Error('A fun��o createUnit est� desativada') },
    evaluate: function () { throw new Error('A fun��o evaluate est� desativada') },
    parse: function () { throw new Error('A fun��o parse est� desativada') },
    simplify: function () { throw new Error('A fun��o simplify est� desativada') },
    derivative: function () { throw new Error('A fun��o derivative est� desativada') },
    format: function () { throw new Error('A fun��o format est� desativada') }
}, { override: true });

const trava = new MessageEmbed()
.setColor(config.color)
.addField('Calculo', `\`\`\`${args.join(' ')}\`\`\``)
.addField('Resultado', `\`\`\`Impossivel Determinar\`\`\``)
.setFooter(`Comando Executado por ${message.author.tag} • Versão: ${config.versão}`, message.author.displayAvatarURL())

if (message.content.toLowerCase().includes(":")) {
   return message.reply(trava)
 }
 
const cia = new MessageEmbed()
.setColor(config.color)
.addField('Calculo', `\`\`\`${args.join(' ')}\`\`\``)
.addField('Resultado', `\`\`\`Esta tentando pegar meu token?\`\`\``)
.setFooter(`Comando Executado por ${message.author.tag} • Versão: ${config.versão}`, message.author.displayAvatarURL())


if (message.content.toLowerCase().includes("token")) {
   return message.reply(cia)
 }


const expr = args.join(' ').toLowerCase();

let result;

try {
    result = limitedEvaluate(expr); //Executa a express�o matem�tica introduzida com o math.evaluate limitado com as fun��es acima desativadas
} catch (err) {
    return message.reply(`calculo invalido!`); //Envia mensagem a avisar que a express�o introduzida � inv�lida se ocorrer algum erro no math.evaluate
}

if (result === Infinity || result === -Infinity || result.toString() === 'NaN') result = 'Imposs�vel determinar'; //Coloca o resultado como 'Imposs�vel de determinar' se o resultado for Infinito ou NaN
if (typeof result === 'function') return message.reply('express�o inv�lida!'); //Envia mensagem a avisar que a express�o � inv�lida se o resultado for do tipo function

const embed = new MessageEmbed()
.setColor(config.color)
.addField('Calculo', `\`\`\`${args.join(' ')}\`\`\``)
.addField('Resultado', `\`\`\`${result}\`\`\``)
.setFooter(`Comando Executado por ${message.author.tag} • Versão: ${config.versão}`, message.author.displayAvatarURL())

    
message.channel.send(`${message.author}` , embed);
}
exports.help = {
    name: 'calc',
    aliases: ['calcular', 'calculadora', 'math'],
    status: 'off'
}