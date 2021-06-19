module.exports = class RbuserCommand {
    constructor() {
      return {
        permissoes: {
          membro: [],
          bot: ['embedLinks'],
          dono: false
        },
        pt: {
          nome: 'fnshop',
          categoria: '🎮 • Jogos',
          desc: 'Mostra a loja do Fortnite'
        },
        en: {
          nome: 'fnshop',
          categoria: '🎮 • Jogos',
          desc: 'Show the Fortnite store'
        },
        aliases: ['fnstore'],
        run: this.run
      }
    }
    async run(ctx) {
      ctx.message.channel.createMessage(ctx.message.author.mention, {
        file: "https://fortool.fr/cm/assets/shop/en.png",
        name: "en.png"
      });
  }
}  
// ADG