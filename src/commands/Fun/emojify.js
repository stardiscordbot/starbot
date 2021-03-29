
module.exports = class Command {
  constructor(){
    return {
      permissoes: {
        membro: [], //Permissoes que o usuario necessita
        bot: [], //Permissoes que o bot necessita
        dono: false //Se apenas nos devs podem usar o comando
      },
      pt: {
        nome: 'emojify',
        categoria: '🤣 • Fun',
        desc: 'Converta seu texto para emojis !!!'
      },
      en: {
        nome: 'emojify',
        categoria: '🤣 • Fun',
        desc: 'Convert your text to emojis !!!'
      },
    aliases: [],
    run: this.run
  }
}

async run(client, message, args, prefixoCerto, idioma) {

 const mapping = {
  ' ': '   ',
  '0': ':zero:',
  '1': ':one:',
  '2': ':two:',
  '3': ':three:',
  '4': ':four:',
  '5': ':five:',
  '6': ':six:',
  '7': ':seven:',
  '8': ':eight:',
  '9': ':nine:',
  '!': ':grey_exclamation:',
  '?': ':grey_question:',
  '#': ':hash:',
  '*': ':asterisk:'
 };

'abcdefghijklmnopqrstuvwxyz'.split('').forEach(c => {
  mapping[c] = mapping[c.toUpperCase()] = ` :regional_indicator_${c}:`;
});

  if (args.length < 1) {
    message.quote(idioma.cmm.text);
}

message.quote(`✅ ${message.author} **|** ${args.join(' ').replace(/`/g, '')
.split('')
.map(c => mapping[c] || c)
.join('')}`);


  }
}
