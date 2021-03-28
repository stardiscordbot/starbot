module.exports = class VarporwaveCommand {
  constructor(){
    return {
      permissoes: {
        membro: [], //Permissoes que o usuario necessita
        bot: [], //Permissoes que o bot necessita
        dono: false //Se apenas nos devs podem usar o comando
      },
      pt: {
        nome: 'vaporwave',
        categoria: '🤣 • Fun',
        desc: 'Cria uma mensagem com ａｅｓｔｈｅｔｉｃｓ	'
      },
      en: {
        nome: 'vaporwave',
        categoria: '🤣 • Fun',
        desc: 'Create a message with ａｅｓｔｈｅｔｉｃｓ'
      },
    aliases: ['vaporonda'],
    run: this.run
    }
  }
  
  async run(client, message, args, prefixoCerto, idioma) {

    let vaporwavefield = args.join(" ").split(" / ")[0].split('').map(char => {
        let code = char.charCodeAt(0);

        return code >= 33 && code <= 126 ? String.fromCharCode((code - 33) + 65281) : char;
    }).join("");

    if(!args[0]) return message.quote(`:x: ${message.author} **|** ${idioma.vaporwave.error.replace('%p', prefixoCerto)}`)
    message.channel.startTyping()
    message.quote(`✍️ ${message.author} **|** ${vaporwavefield}`).then(m => {
      message.channel.stopTyping()
    })

  }
}

//ADG