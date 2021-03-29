module.exports = class Command {
    constructor(){
      return {
        permissoes: {
          membro: [], //Permissoes que o usuario necessita
          bot: [], //Permissoes que o bot necessita
          dono: false //Se apenas nos devs podem usar o comando
        },
        pt: {
          nome: 'clap',
          categoria: '🤣 • Fun',
          desc: 'Bata palmas e seja feliz 👏👏👏'
        },
        en: {
          nome: 'clap',
          categoria: '🤣 • Fun',
          desc: 'Clap your hands and be happy 👏👏👏'
        },
      aliases: ['palmas'],
      run: this.run
    }
  }
  
  async run(client, message, args, prefixoCerto, idioma) {

    if(!args.join(" ")) return message.quote(`:x:  ${message.author} **|** ${idioma.cmm.text}`)
    message.quote(`✅ ${message.author} **|** \`${args.join(" ").toString().replace(/`/g, '').replace(/ /gi, " 👏 ")}\``)
 }
}
