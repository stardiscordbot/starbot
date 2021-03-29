

module.exports = class ExemploCommand {
    constructor(){
      return {
        permissoes: {
          membro: [], //Permissoes que o usuario necessita
          bot: [], //Permissoes que o bot necessita
          dono: false //Se apenas nos devs podem usar o comando
        },
        pt: {
          nome: 'reverse',
          categoria: '🤣 • Fun',
          desc: 'Bruh, essa frase está muito certinha, vamos reverter as palavras ?'
        },
        en: {
          nome: 'reverse',
          categoria: '🤣 • Fun',
          desc: 'Bruh, this sentence is very correct, shall we reverse the words?'
        },
      aliases: ['reverter'],
      run: this.run
      }
    }
    
    async run(client, message, args, prefixo, idioma) {
    if(!args.join(" ")) return message.quote(`:x: ${message.author}, ${idioma.cmm.text}`)
    message.quote(`:heavy_check_mark:  ${message.author}, \n\n> ${args.join(" ").split('').reverse().join('')}`)
 }
}
