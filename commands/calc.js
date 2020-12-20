const { create, all } = require('mathjs'); //npm i mathjs
const cooldowns = {}
const ms = require("ms")
const config = require('../config.json');
const { MessageEmbed } = require('discord.js');
module.exports.run = async(client, message, args, prefix) => {
if (!args.length) return message.reply(`use: ${config.prefix}calc <calculo>`);

const math = create(all);
const limitedEvaluate = math.evaluate;

math.import({
    import: function () { throw new Error('A função import está desativada') },
    createUnit: function () { throw new Error('A função createUnit está desativada') },
    evaluate: function () { throw new Error('A função evaluate está desativada') },
    parse: function () { throw new Error('A função parse está desativada') },
    simplify: function () { throw new Error('A função simplify está desativada') },
    derivative: function () { throw new Error('A função derivative está desativada') },
    format: function () { throw new Error('A função format está desativada') },
    range: function () { throw new Error('A função range está desativada') },
    ones: function () { throw new Error('A função ones está desativada') },
    zeros: function () { throw new Error('A função ones zeros desativada') },
    array: function () { throw new Error('A função ones array desativada') },
    nines: function () { throw new Error('A função ones nines desativada') },
}, { override: true });

const trava = new MessageEmbed()
.setColor(config.color)
.addField('Calculo', `\`\`\`${args.join(' ')}\`\`\``)
.addField('Resultado', `\`\`\`Impossivel Determinar\`\`\``)
.setFooter(`Comando Executado por ${message.author.tag} • Versão: ${config.versão}`, message.author.displayAvatarURL())
/*
if (message.content.toLowerCase().includes(":")) {
   return message.quote(trava)
 }
 */
 
const cia = new MessageEmbed()
.setColor(config.color)
.addField('Calculo', `\`\`\`${args.join(' ')}\`\`\``)
.addField('Resultado', `\`\`\`Token is not defined\`\`\``)
.setFooter(`Comando Executado por ${message.author.tag} • Versão: ${config.versão}`, message.author.displayAvatarURL())

if(args[0].length > 18) {
    return message.quote(`${message.author}, seu calculo é muito longo :(`)
}

if (message.content.toLowerCase().includes("token")) {
   return message.quote(cia)
 }


const expr = args.join(' ').toLowerCase();

let result;

try {
    result = limitedEvaluate(expr); //Executa a express�o matem�tica introduzida com o math.evaluate limitado com as fun��es acima desativadas
} catch (err) {
    return message.quote(`${message.author}, calculo invalido!`); //Envia mensagem a avisar que a express�o introduzida � inv�lida se ocorrer algum erro no math.evaluate
}

if (result === Infinity || result === -Infinity || result.toString() === 'NaN') result = 'Impossivel determinar'; //Coloca o resultado como 'Imposs�vel de determinar' se o resultado for Infinito ou NaN
if (typeof result === 'function') return message.quote(`${message.author}, expressão invalida!`); //Envia mensagem a avisar que a express�o � inv�lida se o resultado for do tipo function

const embed = new MessageEmbed()
.setColor(config.color)
.addField('Calculo', `\`\`\`${args.join(' ')}\`\`\``)
.addField('Resultado', `\`\`\`${result}\`\`\``)
.setFooter(`Comando Executado por ${message.author.tag} • Versão: ${config.versão}`, message.author.displayAvatarURL())

    
message.quote(embed);
}
exports.help = {
    name: 'calc',
    aliases: ['calcular', 'calculadora', 'math'],
    status: 'on'
}